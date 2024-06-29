/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the class CrossPageChannel, the main class in
 * xpc.
 *
 * @see ../../demos/xpc/index.html
 */

goog.declareModuleId('goog.net.xpc.crosspagechannel');

import { Uri } from '../../uri/uri.js';
import { Deferred } from '../../../../third_party/closure/goog/mochikit/async/deferred.js';
import { Delay } from '../../async/delay.js';
import { dispose } from '../../disposable/dispose.js';
import * as dom from '../../dom/dom.js';
import { TagName } from '../../dom/tagname.js';
import * as safe from '../../dom/safe.js';
import * as events from '../../events/events.js';
import { EventHandler } from '../../events/eventhandler.js';
import { EventType } from '../../events/eventtype.js';
import * as functions from '../../functions/functions.js';
import * as legacyconversions from '../../html/legacyconversions.js';
import * as json from '../../json/json.js';
import * as log from '../../log/log.js';
import { AbstractChannel } from '../../messaging/abstractchannel.js';
import * as xpc from './xpc.js';
import { CfgFields as xpcCfgFields, ChannelStates, TransportTypes, UriCfgFields } from './xpc.js';
import { CrossPageChannelRole } from './crosspagechannelrole.js';
import { NativeMessagingTransport } from './nativemessagingtransport.js';
import * as googString from '../../string/string.js';
import * as utils from '../../uri/utils.js';
import * as userAgent from '../../useragent/useragent.js';
const { Transport } = goog.requireType('goog.net.xpc.transport');



/**
 * A communication channel between two documents from different domains.
 * Provides asynchronous messaging.
 *
 * @param {Object} cfg Channel configuration object.
 * @param {dom.DomHelper=} opt_domHelper The optional dom helper to
 *     use for looking up elements in the dom.
 * @constructor
 * @extends {AbstractChannel}
 * @deprecated Prefer goog.messaging.MessageChannel and friends.
 */
export function CrossPageChannel(cfg, opt_domHelper) {
  CrossPageChannel.base(this, 'constructor');

  for (let i = 0, uriField; uriField = UriCfgFields[i]; i++) {
    if (uriField in cfg && !/^https?:\/\//.test(cfg[uriField])) {
      throw new Error(
          'URI ' + cfg[uriField] + ' is invalid for field ' + uriField);
    }
  }

  /**
   * The configuration for this channel.
   * @type {Object}
   * @private
   */
  this.cfg_ = cfg;

  /**
   * The name of the channel. Please use
   * <code>updateChannelNameAndCatalog</code> to change this from the transports
   * vs changing the property directly.
   * @type {string}
   */
  this.name = this.cfg_[xpcCfgFields.CHANNEL_NAME] ||
      xpc.getRandomString(10);

  /**
     * The dom helper to use for accessing the dom.
     * @type {dom.DomHelper}
     * @private
     */
  this.domHelper_ = opt_domHelper || dom.getDomHelper();

  /**
   * Collects deferred function calls which will be made once the connection
   * has been fully set up.
   * @type {!Array<function()>}
   * @private
   */
  this.deferredDeliveries_ = [];

  /**
       * An event handler used to listen for load events on peer iframes.
       * @type {!EventHandler<!CrossPageChannel>}
       * @private
       */
  this.peerLoadHandler_ = new EventHandler(this);

  // If LOCAL_POLL_URI or PEER_POLL_URI is not available, try using
  // robots.txt from that host.
  cfg[xpcCfgFields.LOCAL_POLL_URI] =
      cfg[xpcCfgFields.LOCAL_POLL_URI] ||
      utils.getHost(this.domHelper_.getWindow().location.href) +
          '/robots.txt';
  // PEER_URI is sometimes undefined in tests.
  cfg[xpcCfgFields.PEER_POLL_URI] =
      cfg[xpcCfgFields.PEER_POLL_URI] ||
      utils.getHost(cfg[xpcCfgFields.PEER_URI] || '') +
          '/robots.txt';

  CrossPageChannel.channels[this.name] = this;

  if (!events.getListener(
          window, EventType.UNLOAD,
          CrossPageChannel.disposeAll_)) {
    // Set listener to dispose all registered channels on page unload.
    events.listenOnce(
        window, EventType.UNLOAD,
        CrossPageChannel.disposeAll_);
  }

  log.info(xpc.logger, 'CrossPageChannel created: ' + this.name);
}
goog.inherits(CrossPageChannel, AbstractChannel);


/**
 * Regexp for escaping service names.
 * @type {RegExp}
 * @private
 */
CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_ =
    new RegExp('^%*' + xpc.TRANSPORT_SERVICE + '$');


/**
 * Regexp for unescaping service names.
 * @type {RegExp}
 * @private
 */
CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_ =
    new RegExp('^%+' + xpc.TRANSPORT_SERVICE + '$');


/**
 * A delay between the transport reporting as connected and the calling of the
 * connection callback.  Sometimes used to paper over timing vulnerabilities.
 * @type {?Delay}
 * @private
 */
CrossPageChannel.prototype.connectionDelay_ = null;


/**
 * A deferred which is set to non-null while a peer iframe is being created
 * but has not yet thrown its load event, and which fires when that load event
 * arrives.
 * @type {?Deferred}
 * @private
 */
CrossPageChannel.prototype.peerWindowDeferred_ = null;


/**
 * The transport.
 * @type {Transport?}
 * @private
 */
CrossPageChannel.prototype.transport_ = null;


/**
 * The channel state.
 * @type {number}
 * @private
 */
CrossPageChannel.prototype.state_ =
    ChannelStates.NOT_CONNECTED;


/**
 * @override
 * @return {boolean} Whether the channel is connected.
 */
CrossPageChannel.prototype.isConnected = function() {
  return this.state_ == ChannelStates.CONNECTED;
};


/**
 * Reference to the window-object of the peer page.
 * @type {?Object}
 * @private
 */
CrossPageChannel.prototype.peerWindowObject_ = null;


/**
 * Reference to the iframe-element.
 * @type {?HTMLIFrameElement}
 * @private
 */
CrossPageChannel.prototype.iframeElement_ = null;


/**
 * Returns the configuration object for this channel.
 * Package private. Do not call from outside xpc.
 *
 * @return {Object} The configuration object for this channel.
 */
CrossPageChannel.prototype.getConfig = function() {
  return this.cfg_;
};


/**
 * Returns a reference to the iframe-element.
 * Package private. Do not call from outside xpc.
 *
 * @return {?HTMLIFrameElement} A reference to the iframe-element.
 */
CrossPageChannel.prototype.getIframeElement = function() {
  return this.iframeElement_;
};


/**
 * Sets the window object the foreign document resides in.
 *
 * @param {Object} peerWindowObject The window object of the peer.
 */
CrossPageChannel.prototype.setPeerWindowObject = function(
    peerWindowObject) {
  this.peerWindowObject_ = peerWindowObject;
};


/**
 * Returns the window object the foreign document resides in.
 *
 * @return {Object} The window object of the peer.
 * @package
 */
CrossPageChannel.prototype.getPeerWindowObject = function() {
  return this.peerWindowObject_;
};


/**
 * Determines whether the peer window is available (e.g. not closed).
 *
 * @return {boolean} Whether the peer window is available.
 * @package
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CrossPageChannel.prototype.isPeerAvailable = function() {
  // NOTE(user): This check is not reliable in IE, where a document in an
  // iframe does not get unloaded when removing the iframe element from the DOM.
  // TODO(user): Find something that works in IE as well.
  // NOTE(user): "!this.peerWindowObject_.closed" evaluates to 'false' in IE9
  // sometimes even though typeof(this.peerWindowObject_.closed) is boolean and
  // this.peerWindowObject_.closed evaluates to 'false'. Casting it to a Boolean
  // results in sane evaluation. When this happens, it's in the inner iframe
  // when querying its parent's 'closed' status. Note that this is a different
  // case than mibuerge@'s note above.
  try {
    return !!this.peerWindowObject_ && !this.peerWindowObject_.closed;
  } catch (e) {
    // If the window is closing, an error may be thrown.
    return false;
  }
};


/**
 * Determine which transport type to use for this channel / useragent.
 * @return {!TransportTypes} The best transport type.
 * @private
 */
CrossPageChannel.prototype.determineTransportType_ = function() {
  let transportType;
  if (typeof document.postMessage === 'function' ||
      typeof window.postMessage === 'function' ||
      // IE8 supports window.postMessage, but
      // typeof window.postMessage returns "object"
      (userAgent.IE && window.postMessage)) {
    transportType = TransportTypes.NATIVE_MESSAGING;
  } else {
    transportType = TransportTypes.UNDEFINED;
  }
  return transportType;
};


/**
 * Creates the transport for this channel. Chooses from the available
 * transport based on the user agent and the configuration.
 * @private
 */
CrossPageChannel.prototype.createTransport_ = function() {
  // return, if the transport has already been created
  if (this.transport_) {
    return;
  }

  // TODO(user): Use goog.scope.
  const CfgFields = xpcCfgFields;

  if (!this.cfg_[CfgFields.TRANSPORT]) {
    this.cfg_[CfgFields.TRANSPORT] = this.determineTransportType_();
  }

  // If TRANSPORT cfg is a function, we assume it's a constructor to a
  // Transport implementation. Allows fine-grained dependency control over
  // what Transport impls are brought in.
  if (typeof this.cfg_[CfgFields.TRANSPORT] === 'function') {
    this.transport_ = /** @type {!Transport} */ (
        new this.cfg_[CfgFields.TRANSPORT](this, this.domHelper_));
  } else {
    switch (this.cfg_[CfgFields.TRANSPORT]) {
      case TransportTypes.NATIVE_MESSAGING:
        const protocolVersion =
            this.cfg_[CfgFields.NATIVE_TRANSPORT_PROTOCOL_VERSION] || 2;
        this.transport_ = new NativeMessagingTransport(
            this, this.cfg_[CfgFields.PEER_HOSTNAME], this.domHelper_,
            !!this.cfg_[CfgFields.ONE_SIDED_HANDSHAKE], protocolVersion);
        break;
    }
  }

  if (this.transport_) {
    log.info(
        xpc.logger, 'Transport created: ' + this.transport_.getName());
  } else {
    throw new Error(
        'CrossPageChannel: No suitable transport found! You may ' +
        'try injecting a Transport constructor directly via the channel ' +
        'config object.');
  }
};


/**
 * Returns the transport type in use for this channel.
 * @return {number} Transport-type identifier.
 */
CrossPageChannel.prototype.getTransportType = function() {
  return this.transport_.getType();
};


/**
 * Returns the tranport name in use for this channel.
 * @return {string} The transport name.
 */
CrossPageChannel.prototype.getTransportName = function() {
  return this.transport_.getName();
};


/**
 * @return {!Object} Configuration-object to be used by the peer to
 *     initialize the channel.
 */
CrossPageChannel.prototype.getPeerConfiguration = function() {
  const peerCfg = {};
  peerCfg[xpcCfgFields.CHANNEL_NAME] = this.name;
  peerCfg[xpcCfgFields.TRANSPORT] =
      this.cfg_[xpcCfgFields.TRANSPORT];
  peerCfg[xpcCfgFields.ONE_SIDED_HANDSHAKE] =
      this.cfg_[xpcCfgFields.ONE_SIDED_HANDSHAKE];

  if (this.cfg_[xpcCfgFields.LOCAL_RELAY_URI]) {
    peerCfg[xpcCfgFields.PEER_RELAY_URI] =
        this.cfg_[xpcCfgFields.LOCAL_RELAY_URI];
  }
  if (this.cfg_[xpcCfgFields.LOCAL_POLL_URI]) {
    peerCfg[xpcCfgFields.PEER_POLL_URI] =
        this.cfg_[xpcCfgFields.LOCAL_POLL_URI];
  }
  if (this.cfg_[xpcCfgFields.PEER_POLL_URI]) {
    peerCfg[xpcCfgFields.LOCAL_POLL_URI] =
        this.cfg_[xpcCfgFields.PEER_POLL_URI];
  }
  const role = this.cfg_[xpcCfgFields.ROLE];
  if (role) {
    peerCfg[xpcCfgFields.ROLE] =
        role == CrossPageChannelRole.INNER ?
        CrossPageChannelRole.OUTER :
        CrossPageChannelRole.INNER;
  }

  return peerCfg;
};


/**
 * Creates the iframe containing the peer page in a specified parent element.
 * This method does not connect the channel, connect() still has to be called
 * separately.
 *
 * @param {!Element} parentElm The container element the iframe is appended to.
 * @param {Function=} opt_configureIframeCb If present, this function gets
 *     called with the iframe element as parameter to allow setting properties
 *     on it before it gets added to the DOM. If absent, the iframe's width and
 *     height are set to '100%'.
 * @param {boolean=} opt_addCfgParam Whether to add the peer configuration as
 *     URL parameter (default: true).
 * @return {!HTMLIFrameElement} The iframe element.
 */
CrossPageChannel.prototype.createPeerIframe = function(
    parentElm, opt_configureIframeCb, opt_addCfgParam) {
  log.info(xpc.logger, 'createPeerIframe()');

  let iframeId = this.cfg_[xpcCfgFields.IFRAME_ID];
  if (!iframeId) {
    // Create a randomized ID for the iframe element to avoid
    // bfcache-related issues.
    iframeId = this.cfg_[xpcCfgFields.IFRAME_ID] =
        'xpcpeer' + xpc.getRandomString(4);
  }

  // TODO(user) Opera creates a history-entry when creating an iframe
  // programmatically as follows. Find a way which avoids this.

  const iframeElm =
      dom.getDomHelper(parentElm).createElement(TagName.IFRAME);
  iframeElm.id = iframeElm.name = iframeId;
  if (opt_configureIframeCb) {
    opt_configureIframeCb(iframeElm);
  } else {
    iframeElm.style.width = iframeElm.style.height = '100%';
  }

  this.cleanUpIncompleteConnection_();
  this.peerWindowDeferred_ = new Deferred(undefined, this);
  const peerUri = this.getPeerUri(opt_addCfgParam);
  this.peerLoadHandler_.listenOnceWithScope(
      iframeElm, 'load', this.peerWindowDeferred_.callback, false,
      this.peerWindowDeferred_);

  if (userAgent.GECKO || userAgent.WEBKIT) {
    // Appending the iframe in a timeout to avoid a weird fastback issue, which
    // is present in Safari and Gecko.
    window.setTimeout(goog.bind(function() {
      parentElm.appendChild(iframeElm);
      safe.setIframeSrc(
          iframeElm,
          legacyconversions.trustedResourceUrlFromString(
              peerUri.toString()));
      log.info(
          xpc.logger, 'peer iframe created (' + iframeId + ')');
    }, this), 1);
  } else {
    safe.setIframeSrc(
        iframeElm,
        legacyconversions.trustedResourceUrlFromString(
            peerUri.toString()));
    parentElm.appendChild(iframeElm);
    log.info(
        xpc.logger, 'peer iframe created (' + iframeId + ')');
  }

  return /** @type {!HTMLIFrameElement} */ (iframeElm);
};


/**
 * Clean up after any incomplete attempt to establish and connect to a peer
 * iframe.
 * @private
 */
CrossPageChannel.prototype.cleanUpIncompleteConnection_ =
    function() {
      if (this.peerWindowDeferred_) {
        this.peerWindowDeferred_.cancel();
        this.peerWindowDeferred_ = null;
      }
      this.deferredDeliveries_.length = 0;
      this.peerLoadHandler_.removeAll();
    };


/**
 * Returns the peer URI, with an optional URL parameter for configuring the peer
 * window.
 *
 * @param {boolean=} opt_addCfgParam Whether to add the peer configuration as
 *     URL parameter (default: true).
 * @return {!Uri} The peer URI.
 */
CrossPageChannel.prototype.getPeerUri = function(opt_addCfgParam) {
  let peerUri = this.cfg_[xpcCfgFields.PEER_URI];
  if (typeof peerUri === 'string') {
    peerUri = this.cfg_[xpcCfgFields.PEER_URI] =
        new Uri(peerUri);
  }

  // Add the channel configuration used by the peer as URL parameter.
  if (opt_addCfgParam !== false) {
    peerUri.setParameterValue(
        'xpc', json.serialize(this.getPeerConfiguration()));
  }

  return peerUri;
};


/**
 * Initiates connecting the channel. When this method is called, all the
 * information needed to connect the channel has to be available.
 *
 * @override
 * @param {Function=} opt_connectCb The function to be called when the
 * channel has been connected and is ready to be used.
 */
CrossPageChannel.prototype.connect = function(opt_connectCb) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.connectCb_ = opt_connectCb || functions.UNDEFINED;

  // If this channel was previously closed, transition back to the NOT_CONNECTED
  // state to ensure that the connection can proceed (xpcDeliver blocks
  // transport messages while the connection state is CLOSED).
  if (this.state_ == ChannelStates.CLOSED) {
    this.state_ = ChannelStates.NOT_CONNECTED;
  }

  // If we know of a peer window whose creation has been requested but is not
  // complete, peerWindowDeferred_ will be non-null, and we should block on it.
  if (this.peerWindowDeferred_) {
    this.peerWindowDeferred_.addCallback(this.continueConnection_);
  } else {
    this.continueConnection_();
  }
};


/**
 * Continues the connection process once we're as sure as we can be that the
 * peer iframe has been created.
 * @private
 */
CrossPageChannel.prototype.continueConnection_ = function() {
  log.info(xpc.logger, 'continueConnection_()');
  this.peerWindowDeferred_ = null;
  if (this.cfg_[xpcCfgFields.IFRAME_ID]) {
    this.iframeElement_ = /** @type {?HTMLIFrameElement} */ (
        this.domHelper_.getElement(
            this.cfg_[xpcCfgFields.IFRAME_ID]));
  }
  if (this.iframeElement_) {
    let winObj = this.iframeElement_.contentWindow;
    // accessing the window using contentWindow doesn't work in safari
    if (!winObj) {
      winObj = window.frames[this.cfg_[xpcCfgFields.IFRAME_ID]];
    }
    this.setPeerWindowObject(winObj);
  }

  // if the peer window object has not been set at this point, we assume
  // being in an iframe and the channel is meant to be to the containing page
  if (!this.peerWindowObject_) {
    // throw an error if we are in the top window (== not in an iframe)
    if (window == window.top) {
      throw new Error(
          'CrossPageChannel: Can\'t connect, peer window-object not set.');
    } else {
      this.setPeerWindowObject(window.parent);
    }
  }

  this.createTransport_();

  this.transport_.connect();

  // Now we run any deferred deliveries collected while connection was deferred.
  while (this.deferredDeliveries_.length > 0) {
    this.deferredDeliveries_.shift()();
  }
};


/**
 * Closes the channel.
 */
CrossPageChannel.prototype.close = function() {
  this.cleanUpIncompleteConnection_();
  this.state_ = ChannelStates.CLOSED;
  dispose(this.transport_);
  this.transport_ = null;
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.connectCb_ = null;
  dispose(this.connectionDelay_);
  this.connectionDelay_ = null;
  log.info(xpc.logger, 'Channel "' + this.name + '" closed');
};


/**
 * Package-private.
 * Called by the transport when the channel is connected.
 * @param {number=} opt_delay Delay this number of milliseconds before calling
 *     the connection callback. Usage is discouraged, but can be used to paper
 *     over timing vulnerabilities when there is no alternative.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CrossPageChannel.prototype.notifyConnected = function(opt_delay) {
  if (this.isConnected() ||
      (this.connectionDelay_ && this.connectionDelay_.isActive())) {
    return;
  }
  this.state_ = ChannelStates.CONNECTED;
  log.info(xpc.logger, 'Channel "' + this.name + '" connected');
  dispose(this.connectionDelay_);
  if (opt_delay !== undefined) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.connectionDelay_ = new Delay(this.connectCb_, opt_delay);
    this.connectionDelay_.start();
  } else {
    this.connectionDelay_ = null;
    this.connectCb_();
  }
};


/**
 * Called by the transport in case of an unrecoverable failure.
 * Package private. Do not call from outside xpc.
 */
CrossPageChannel.prototype.notifyTransportError = function() {
  log.info(xpc.logger, 'Transport Error');
  this.close();
};


/** @override */
CrossPageChannel.prototype.send = function(serviceName, payload) {
  if (!this.isConnected()) {
    log.error(xpc.logger, 'Can\'t send. Channel not connected.');
    return;
  }
  // Check if the peer is still around.
  if (!this.isPeerAvailable()) {
    log.error(xpc.logger, 'Peer has disappeared.');
    this.close();
    return;
  }
  if (goog.isObject(payload)) {
    payload = json.serialize(payload);
  }

  // Partially URL-encode the service name because some characters (: and |) are
  // used as delimiters for some transports, and we want to allow those
  // characters in service names.
  this.transport_.send(this.escapeServiceName_(serviceName), payload);
};


/**
 * Delivers messages to the appropriate service-handler. Named xpcDeliver to
 * avoid name conflict with `deliver` function in superclass
 * AbstractChannel.
 *
 * @param {string} serviceName The name of the port.
 * @param {string} payload The payload.
 * @param {string=} opt_origin An optional origin for the message, where the
 *     underlying transport makes that available.  If this is specified, and
 *     the PEER_HOSTNAME parameter was provided, they must match or the message
 *     will be rejected.
 * @package
 */
CrossPageChannel.prototype.xpcDeliver = function(
    serviceName, payload, opt_origin) {
  // This check covers the very rare (but producable) case where the inner frame
  // becomes ready and sends its setup message while the outer frame is
  // deferring its connect method waiting for the inner frame to be ready. The
  // resulting deferral ensures the message will not be processed until the
  // channel is fully configured.
  if (this.peerWindowDeferred_) {
    this.deferredDeliveries_.push(
        goog.bind(this.xpcDeliver, this, serviceName, payload, opt_origin));
    return;
  }

  // Check whether the origin of the message is as expected.
  if (!this.isMessageOriginAcceptable(opt_origin)) {
    log.warning(
        xpc.logger, 'Message received from unapproved origin "' +
            opt_origin + '" - rejected.');
    return;
  }

  // If there is another channel still open, the native transport's global
  // postMessage listener will still be active.  This will mean that messages
  // being sent to the now-closed channel will still be received and delivered,
  // such as transport service traffic from its previous correspondent in the
  // other frame.  Ensure these messages don't cause exceptions.
  // Example: http://b/12419303
  if (this.isDisposed() || this.state_ == ChannelStates.CLOSED) {
    log.warning(
        xpc.logger, 'CrossPageChannel::xpcDeliver(): Channel closed.');
  } else if (!serviceName || serviceName == xpc.TRANSPORT_SERVICE) {
    this.transport_.transportServiceHandler(payload);
  } else {
    // only deliver messages if connected
    if (this.isConnected()) {
      this.deliver(this.unescapeServiceName_(serviceName), payload);
    } else {
      log.info(
          xpc.logger,
          'CrossPageChannel::xpcDeliver(): Not connected.');
    }
  }
};


/**
 * Escape the user-provided service name for sending across the channel. This
 * URL-encodes certain special characters so they don't conflict with delimiters
 * used by some of the transports, and adds a special prefix if the name
 * conflicts with the reserved transport service name.
 *
 * This is the opposite of {@link #unescapeServiceName_}.
 *
 * @param {string} name The name of the service to escape.
 * @return {string} The escaped service name.
 * @private
 */
CrossPageChannel.prototype.escapeServiceName_ = function(name) {
  if (CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_.test(name)) {
    name = '%' + name;
  }
  return name.replace(/[%:|]/g, encodeURIComponent);
};


/**
 * Unescape the escaped service name that was sent across the channel. This is
 * the opposite of {@link #escapeServiceName_}.
 *
 * @param {string} name The name of the service to unescape.
 * @return {string} The unescaped service name.
 * @private
 */
CrossPageChannel.prototype.unescapeServiceName_ = function(name) {
  name = name.replace(/%[0-9a-f]{2}/gi, decodeURIComponent);
  if (CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_.test(name)) {
    return name.substring(1);
  } else {
    return name;
  }
};


/**
 * Returns the role of this channel (either inner or outer).
 * @return {number} The role of this channel.
 */
CrossPageChannel.prototype.getRole = function() {
  const role = this.cfg_[xpcCfgFields.ROLE];
  if (typeof role === 'number') {
    return role;
  } else {
    return window.parent == this.peerWindowObject_ ?
        CrossPageChannelRole.INNER :
        CrossPageChannelRole.OUTER;
  }
};


/**
 * Sets the channel name. Note, this doesn't establish a unique channel to
 * communicate on.
 * @param {string} name The new channel name.
 */
CrossPageChannel.prototype.updateChannelNameAndCatalog = function(
    name) {
  log.fine(xpc.logger, 'changing channel name to ' + name);
  delete CrossPageChannel.channels[this.name];
  this.name = name;
  CrossPageChannel.channels[name] = this;
};


/**
 * Returns whether an incoming message with the given origin is acceptable.
 * If an incoming request comes with a specified (non-empty) origin, and the
 * PEER_HOSTNAME config parameter has also been provided, the two must match,
 * or the message is unacceptable.
 * @param {string=} opt_origin The origin associated with the incoming message.
 * @return {boolean} Whether the message is acceptable.
 * @package
 */
CrossPageChannel.prototype.isMessageOriginAcceptable = function(
    opt_origin) {
  const peerHostname = this.cfg_[xpcCfgFields.PEER_HOSTNAME];
  return googString.isEmptyOrWhitespace(googString.makeSafe(opt_origin)) ||
      googString.isEmptyOrWhitespace(googString.makeSafe(peerHostname)) ||
      opt_origin == this.cfg_[xpcCfgFields.PEER_HOSTNAME];
};


/** @override */
CrossPageChannel.prototype.disposeInternal = function() {
  this.close();

  this.peerWindowObject_ = null;
  this.iframeElement_ = null;
  delete CrossPageChannel.channels[this.name];
  dispose(this.peerLoadHandler_);
  delete this.peerLoadHandler_;
  CrossPageChannel.base(this, 'disposeInternal');
};


/**
 * Disposes all channels.
 * @private
 */
CrossPageChannel.disposeAll_ = function() {
  for (let name in CrossPageChannel.channels) {
    dispose(CrossPageChannel.channels[name]);
  }
};


/**
 * Object holding active channels.
 *
 * @package {!Object<string, !CrossPageChannel>}
 */
CrossPageChannel.channels = {};
