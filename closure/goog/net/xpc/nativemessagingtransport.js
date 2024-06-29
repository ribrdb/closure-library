/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Contains the class which uses native messaging
 * facilities for cross domain communication.
 */


import { Timer } from '../../timer/timer.js';

import * as asserts from '../../asserts/asserts.js';
import { Deferred } from '../../../../third_party/closure/goog/mochikit/async/deferred.js';
import { dispose } from '../../disposable/dispose.js';
import * as events from '../../events/events.js';
import { EventHandler } from '../../events/eventhandler.js';
import * as log from '../../log/log.js';
import * as xpc from './xpc.js';
import { TransportTypes } from './xpc.js';
import { CrossPageChannel } from './crosspagechannel.js';
import { CrossPageChannelRole } from './crosspagechannelrole.js';
import { Transport } from './transport.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * The native messaging transport
 *
 * Uses document.postMessage() to send messages to other documents.
 * Receiving is done by listening on 'message'-events on the document.
 *
 * @param {CrossPageChannel} channel The channel this
 *     transport belongs to.
 * @param {string} peerHostname The hostname (protocol, domain, and port) of the
 *     peer.
 * @param {DomHelper=} opt_domHelper The dom helper to use for
 *     finding the correct window/document.
 * @param {boolean=} opt_oneSidedHandshake If this is true, only the outer
 *     transport sends a SETUP message and expects a SETUP_ACK.  The inner
 *     transport goes connected when it receives the SETUP.
 * @param {number=} opt_protocolVersion Which version of its setup protocol the
 *     transport should use.  The default is '2'.
 * @constructor
 * @extends {Transport}
 * @final
 */
export function NativeMessagingTransport(
  channel,
  peerHostname,
  opt_domHelper,
  opt_oneSidedHandshake,
  opt_protocolVersion
) {
  NativeMessagingTransport.base(
      this, 'constructor', opt_domHelper);

  /**
     * The channel this transport belongs to.
     * @type {CrossPageChannel}
     * @private
     */
  this.channel_ = channel;

  /**
   * Which version of the transport's protocol should be used.
   * @type {number}
   * @private
   */
  this.protocolVersion_ = opt_protocolVersion || 2;
  asserts.assert(this.protocolVersion_ >= 1);
  asserts.assert(this.protocolVersion_ <= 2);

  /**
   * The hostname of the peer. This parameterizes all calls to postMessage, and
   * should contain the precise protocol, domain, and port of the peer window.
   * @type {string}
   * @private
   */
  this.peerHostname_ = peerHostname || '*';

  /**
       * The event handler.
       * @type {!EventHandler<!NativeMessagingTransport>}
       * @private
       */
  this.eventHandler_ = new EventHandler(this);

  /**
     * Timer for connection reattempts.
     * @type {!Timer}
     * @private
     */
  this.maybeAttemptToConnectTimer_ = new Timer(100, this.getWindow());

  /**
   * Whether one-sided handshakes are enabled.
   * @type {boolean}
   * @private
   */
  this.oneSidedHandshake_ = !!opt_oneSidedHandshake;

  /**
     * Fires once we've received our SETUP_ACK message.
     * @type {!Deferred}
     * @private
     */
  this.setupAckReceived_ = new Deferred();

  /**
     * Fires once we've sent our SETUP_ACK message.
     * @type {!Deferred}
     * @private
     */
  this.setupAckSent_ = new Deferred();

  /**
     * Fires once we're marked connected.
     * @type {!Deferred}
     * @private
     */
  this.connected_ = new Deferred();

  /**
   * The unique ID of this side of the connection. Used to determine when a peer
   * is reloaded.
   * @type {string}
   * @private
   */
  this.endpointId_ = xpc.getRandomString(10);

  /**
   * The unique ID of the peer. If we get a message from a peer with an ID we
   * don't expect, we reset the connection.
   * @type {?string}
   * @private
   */
  this.peerEndpointId_ = null;

  // We don't want to mark ourselves connected until we have sent whatever
  // message will cause our counterpart in the other frame to also declare
  // itself connected, if there is such a message.  Otherwise we risk a user
  // message being sent in advance of that message, and it being discarded.
  if (this.oneSidedHandshake_) {
    if (this.channel_.getRole() == CrossPageChannelRole.INNER) {
      // One sided handshake, inner frame:
      // SETUP_ACK must be received.
      this.connected_.awaitDeferred(this.setupAckReceived_);
    } else {
      // One sided handshake, outer frame:
      // SETUP_ACK must be sent.
      this.connected_.awaitDeferred(this.setupAckSent_);
    }
  } else {
    // Two sided handshake:
    // SETUP_ACK has to have been received, and sent.
    this.connected_.awaitDeferred(this.setupAckReceived_);
    if (this.protocolVersion_ == 2) {
      this.connected_.awaitDeferred(this.setupAckSent_);
    }
  }
  this.connected_.addCallback(this.notifyConnected_, this);
  this.connected_.callback(true);

  this.eventHandler_.listen(
      this.maybeAttemptToConnectTimer_, Timer.TICK,
      this.maybeAttemptToConnect_);

  log.info(
      xpc.logger, 'NativeMessagingTransport created.  ' +
          'protocolVersion=' + this.protocolVersion_ + ', oneSidedHandshake=' +
          this.oneSidedHandshake_ + ', role=' + this.channel_.getRole());
}
goog.inherits(NativeMessagingTransport, Transport);


/**
 * Length of the delay in milliseconds between the channel being connected and
 * the connection callback being called, in cases where coverage of timing flaws
 * is required.
 * @type {number}
 * @private
 */
NativeMessagingTransport.CONNECTION_DELAY_MS_ = 200;


/**
 * Current determination of peer's protocol version, or null for unknown.
 * @type {?number}
 * @private
 */
NativeMessagingTransport.prototype.peerProtocolVersion_ = null;


/**
 * Flag indicating if this instance of the transport has been initialized.
 * @type {boolean}
 * @private
 */
NativeMessagingTransport.prototype.initialized_ = false;


/**
 * The transport type.
 * @type {number}
 * @override
 */
NativeMessagingTransport.prototype.transportType =
    TransportTypes.NATIVE_MESSAGING;


/**
 * The delimiter used for transport service messages.
 * @type {string}
 * @private
 */
NativeMessagingTransport.MESSAGE_DELIMITER_ = ',';


/**
 * Tracks the number of NativeMessagingTransport channels that have been
 * initialized but not disposed yet in a map keyed by the UID of the window
 * object.  This allows for multiple windows to be initiallized and listening
 * for messages.
 * @type {Object<number>}
 * @private
 */
NativeMessagingTransport.activeCount_ = {};


/**
 * Id of a timer user during postMessage sends.
 * @type {number}
 * @private
 */
NativeMessagingTransport.prototype.sendTimerId_ = 0;


/**
 * Checks whether the peer transport protocol version could be as indicated.
 * @param {number} version The version to check for.
 * @return {boolean} Whether the peer transport protocol version is as
 *     indicated, or null.
 * @private
 */
NativeMessagingTransport.prototype.couldPeerVersionBe_ = function(
    version) {
  return this.peerProtocolVersion_ == null ||
      this.peerProtocolVersion_ == version;
};


/**
 * Initializes this transport. Registers a listener for 'message'-events
 * on the document.
 * @param {Window} listenWindow The window to listen to events on.
 * @private
 */
NativeMessagingTransport.initialize_ = function(listenWindow) {
  const uid = goog.getUid(listenWindow);
  let value = NativeMessagingTransport.activeCount_[uid];
  if (typeof value !== 'number') {
    value = 0;
  }
  if (value == 0) {
    // Listen for message-events. These are fired on window in FF3 and on
    // document in Opera.
    events.listen(
        listenWindow.postMessage ? listenWindow : listenWindow.document,
        'message', NativeMessagingTransport.messageReceived_,
        false, NativeMessagingTransport);
  }
  NativeMessagingTransport.activeCount_[uid] = value + 1;
};


/**
 * Processes an incoming message-event.
 * @param {BrowserEvent} msgEvt The message event.
 * @return {boolean} True if message was successfully delivered to a channel.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
NativeMessagingTransport.messageReceived_ = function(msgEvt) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  const data = msgEvt.getBrowserEvent().data;

  if (typeof data !== 'string') {
    return false;
  }

  const headDelim = data.indexOf('|');
  const serviceDelim = data.indexOf(':');

  // make sure we got something reasonable
  if (headDelim == -1 || serviceDelim == -1) {
    return false;
  }

  const channelName = data.substring(0, headDelim);
  const service = data.substring(headDelim + 1, serviceDelim);
  const payload = data.substring(serviceDelim + 1);

  log.fine(
      xpc.logger, 'messageReceived: channel=' + channelName +
          ', service=' + service + ', payload=' + payload);

  // Attempt to deliver message to the channel. Keep in mind that it may not
  // exist for several reasons, including but not limited to:
  //  - a malformed message
  //  - the channel simply has not been created
  //  - channel was created in a different namespace
  //  - message was sent to the wrong window
  //  - channel has become stale (e.g. caching iframes and back clicks)
  const allChannels = CrossPageChannel.channels;
  const channel = allChannels[channelName];
  if (channel) {
    channel.xpcDeliver(
        service, payload,
        /** @type {!MessageEvent} */ (msgEvt.getBrowserEvent()).origin);
    return true;
  }

  const transportMessageType =
      NativeMessagingTransport.parseTransportPayload_(payload)[0];

  // Check if there are any stale channel names that can be updated.
  for (let staleChannelName in allChannels) {
    const staleChannel = allChannels[staleChannelName];
    if (staleChannel.getRole() == CrossPageChannelRole.INNER &&
        !staleChannel.isConnected() &&
        service == xpc.TRANSPORT_SERVICE &&
        (transportMessageType == xpc.SETUP ||
         transportMessageType == xpc.SETUP_NTPV2) &&
        staleChannel.isMessageOriginAcceptable(
            msgEvt.getBrowserEvent().origin)) {
      // Inner peer received SETUP message but channel names did not match.
      // Start using the channel name sent from outer peer. The channel name
      // of the inner peer can easily become out of date, as iframe's and their
      // JS state get cached in many browsers upon page reload or history
      // navigation (particularly Firefox 1.5+). We can trust the outer peer,
      // since we only accept postMessage messages from the same hostname that
      // originally setup the channel.
      staleChannel.updateChannelNameAndCatalog(channelName);
      staleChannel.xpcDeliver(service, payload);
      return true;
    }
  }

  // Failed to find a channel to deliver this message to, so simply ignore it.
  log.info(xpc.logger, 'channel name mismatch; message ignored"');
  return false;
};


/**
 * Handles transport service messages.
 * @param {string} payload The message content.
 * @override
 */
NativeMessagingTransport.prototype.transportServiceHandler =
    function(payload) {
      const transportParts =
          NativeMessagingTransport.parseTransportPayload_(payload);
      const transportMessageType = transportParts[0];
      const peerEndpointId = transportParts[1];
      switch (transportMessageType) {
        case xpc.SETUP_ACK:
          this.setPeerProtocolVersion_(1);
          if (!this.setupAckReceived_.hasFired()) {
            this.setupAckReceived_.callback(true);
          }
          break;
        case xpc.SETUP_ACK_NTPV2:
          if (this.protocolVersion_ == 2) {
            this.setPeerProtocolVersion_(2);
            if (!this.setupAckReceived_.hasFired()) {
              this.setupAckReceived_.callback(true);
            }
          }
          break;
        case xpc.SETUP:
          this.setPeerProtocolVersion_(1);
          this.sendSetupAckMessage_(1);
          break;
        case xpc.SETUP_NTPV2:
          if (this.protocolVersion_ == 2) {
            const prevPeerProtocolVersion = this.peerProtocolVersion_;
            this.setPeerProtocolVersion_(2);
            this.sendSetupAckMessage_(2);
            if ((prevPeerProtocolVersion == 1 || this.peerEndpointId_ != null) &&
                this.peerEndpointId_ != peerEndpointId) {
              // Send a new SETUP message since the peer has been replaced.
              log.info(
                  xpc.logger,
                  'Sending SETUP and changing peer ID to: ' + peerEndpointId);
              this.sendSetupMessage_();
            }
            this.peerEndpointId_ = peerEndpointId;
          }
          break;
      }
    };


/**
 * Sends a SETUP transport service message of the correct protocol number for
 * our current situation.
 * @private
 */
NativeMessagingTransport.prototype.sendSetupMessage_ = function() {
  // 'real' (legacy) v1 transports don't know about there being v2 ones out
  // there, and we shouldn't either.
  asserts.assert(
      !(this.protocolVersion_ == 1 && this.peerProtocolVersion_ == 2));

  if (this.protocolVersion_ == 2 && this.couldPeerVersionBe_(2)) {
    let payload = xpc.SETUP_NTPV2;
    payload += NativeMessagingTransport.MESSAGE_DELIMITER_;
    payload += this.endpointId_;
    this.send(xpc.TRANSPORT_SERVICE, payload);
  }

  // For backward compatibility reasons, the V1 SETUP message can be sent by
  // both V1 and V2 transports.  Once a V2 transport has 'heard' another V2
  // transport it starts ignoring V1 messages, so the V2 message must be sent
  // first.
  if (this.couldPeerVersionBe_(1)) {
    this.send(xpc.TRANSPORT_SERVICE, xpc.SETUP);
  }
};


/**
 * Sends a SETUP_ACK transport service message of the correct protocol number
 * for our current situation.
 * @param {number} protocolVersion The protocol version of the SETUP message
 *     which gave rise to this ack message.
 * @private
 */
NativeMessagingTransport.prototype.sendSetupAckMessage_ = function(
    protocolVersion) {
  asserts.assert(
      this.protocolVersion_ != 1 || protocolVersion != 2,
      'Shouldn\'t try to send a v2 setup ack in v1 mode.');
  if (this.protocolVersion_ == 2 && this.couldPeerVersionBe_(2) &&
      protocolVersion == 2) {
    this.send(xpc.TRANSPORT_SERVICE, xpc.SETUP_ACK_NTPV2);
  } else if (this.couldPeerVersionBe_(1) && protocolVersion == 1) {
    this.send(xpc.TRANSPORT_SERVICE, xpc.SETUP_ACK);
  } else {
    return;
  }

  if (!this.setupAckSent_.hasFired()) {
    this.setupAckSent_.callback(true);
  }
};


/**
 * Attempts to set the peer protocol number.  Downgrades from 2 to 1 are not
 * permitted.
 * @param {number} version The new protocol number.
 * @private
 * @suppress {strictPrimitiveOperators}
 */
NativeMessagingTransport.prototype.setPeerProtocolVersion_ =
    function(version) {
      if (version > this.peerProtocolVersion_) {
        this.peerProtocolVersion_ = version;
      }
      if (this.peerProtocolVersion_ == 1) {
        if (!this.setupAckSent_.hasFired() && !this.oneSidedHandshake_) {
          this.setupAckSent_.callback(true);
        }
        this.peerEndpointId_ = null;
      }
    };


/**
 * Connects this transport.
 * @override
 */
NativeMessagingTransport.prototype.connect = function() {
  NativeMessagingTransport.initialize_(this.getWindow());
  this.initialized_ = true;
  this.maybeAttemptToConnect_();
};


/**
 * Connects to other peer. In the case of the outer peer, the setup messages are
 * likely sent before the inner peer is ready to receive them. Therefore, this
 * function will continue trying to send the SETUP message until the inner peer
 * responds. In the case of the inner peer, it will occasionally have its
 * channel name fall out of sync with the outer peer, particularly during
 * soft-reloads and history navigations.
 * @private
 */
NativeMessagingTransport.prototype.maybeAttemptToConnect_ =
    function() {
      // In a one-sided handshake, the outer frame does not send a SETUP message,
      // but the inner frame does.
      const outerFrame =
          this.channel_.getRole() == CrossPageChannelRole.OUTER;
      if ((this.oneSidedHandshake_ && outerFrame) || this.channel_.isConnected() ||
          this.isDisposed()) {
        this.maybeAttemptToConnectTimer_.stop();
        return;
      }
      this.maybeAttemptToConnectTimer_.start();
      this.sendSetupMessage_();
    };


/**
 * Sends a message.
 * @param {string} service The name off the service the message is to be
 * delivered to.
 * @param {string} payload The message content.
 * @override
 */
NativeMessagingTransport.prototype.send = function(
    service, payload) {
  const win = this.channel_.getPeerWindowObject();
  if (!win) {
    log.fine(xpc.logger, 'send(): window not ready');
    return;
  }

  this.send = function(service, payload) {
    // In IE8 (and perhaps elsewhere), it seems like postMessage is sometimes
    // implemented as a synchronous call.  That is, calling it synchronously
    // calls whatever listeners it has, and control is not returned to the
    // calling thread until those listeners are run.  This produces different
    // ordering to all other browsers, and breaks this protocol.  This timer
    // callback is introduced to produce standard behavior across all browsers.
    const transport = this;
    const channelName = this.channel_.name;
    const sendFunctor = function() {
      transport.sendTimerId_ = 0;

      try {
        // postMessage is a method of the window object, except in some
        // versions of Opera, where it is a method of the document object.  It
        // also seems that the appearance of postMessage on the peer window
        // object can sometimes be delayed.
        /**
         * @suppress {strictMissingProperties} Added to tighten compiler checks
         */
        const obj = win.postMessage ? win : win.document;
        if (!obj.postMessage) {
          log.warning(
              xpc.logger, 'Peer window had no postMessage function.');
          return;
        }

        obj.postMessage(
            channelName + '|' + service + ':' + payload,
            transport.peerHostname_);
        log.fine(
            xpc.logger, 'send(): service=' + service + ' payload=' +
                payload + ' to hostname=' + transport.peerHostname_);
      } catch (error) {
        // There is some evidence (not totally convincing) that postMessage can
        // be missing or throw errors during a narrow timing window during
        // startup.  This protects against that.
        log.warning(
            xpc.logger, 'Error performing postMessage, ignoring.',
            error);
      }
    };
    this.sendTimerId_ = Timer.callOnce(sendFunctor, 0);
  };
  this.send(service, payload);
};


/**
 * Notify the channel that this transport is connected.  If either transport is
 * protocol v1, a short delay is required to paper over timing vulnerabilities
 * in that protocol version.
 * @private
 */
NativeMessagingTransport.prototype.notifyConnected_ = function() {
  const delay = (this.protocolVersion_ == 1 || this.peerProtocolVersion_ == 1) ?
      NativeMessagingTransport.CONNECTION_DELAY_MS_ :
      undefined;
  this.channel_.notifyConnected(delay);
};


/** @override */
NativeMessagingTransport.prototype.disposeInternal = function() {
  if (this.initialized_) {
    const listenWindow = this.getWindow();
    const uid = goog.getUid(listenWindow);
    const value = NativeMessagingTransport.activeCount_[uid];
    NativeMessagingTransport.activeCount_[uid] = value - 1;
    if (value == 1) {
      events.unlisten(
          listenWindow.postMessage ? listenWindow : listenWindow.document,
          'message', NativeMessagingTransport.messageReceived_,
          false, NativeMessagingTransport);
    }
  }

  if (this.sendTimerId_) {
    Timer.clear(this.sendTimerId_);
    this.sendTimerId_ = 0;
  }

  dispose(this.eventHandler_);
  delete this.eventHandler_;

  dispose(this.maybeAttemptToConnectTimer_);
  delete this.maybeAttemptToConnectTimer_;

  this.setupAckReceived_.cancel();
  delete this.setupAckReceived_;
  this.setupAckSent_.cancel();
  delete this.setupAckSent_;
  this.connected_.cancel();
  delete this.connected_;

  // Cleaning up this.send as it is an instance method, created in
  /* NativeMessagingTransport.prototype.send and has a closure over*/
  // this.channel_.peerWindowObject_.
  delete this.send;

  NativeMessagingTransport.base(this, 'disposeInternal');
};


/**
 * Parse a transport service payload message.  For v1, it is simply expected to
 * be 'SETUP' or 'SETUP_ACK'.  For v2, an example setup message is
 * 'SETUP_NTPV2,abc123', where the second part is the endpoint id.  The v2 setup
 * ack message is simply 'SETUP_ACK_NTPV2'.
 * @param {string} payload The payload.
 * @return {!Array<?string>} An array with the message type as the first member
 *     and the endpoint id as the second, if one was sent, or null otherwise.
 * @private
 */
NativeMessagingTransport.parseTransportPayload_ = function(
    payload) {
  const transportParts = /** @type {!Array<?string>} */ (
      payload.split(NativeMessagingTransport.MESSAGE_DELIMITER_));
  transportParts[1] = transportParts[1] || null;
  return transportParts;
};
