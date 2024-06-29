const { MessageChannel } = goog.requireType('goog.messaging.messagechannel');


/**
 * @interface
 */
export function PortNetwork() {}


/**
 * Returns a message channel that communicates with the named context. If no
 * such port exists, an error will either be thrown immediately or after a round
 * trip with the operator, depending on whether this pool is the operator or a
 * caller.
 *
 * If context A calls dial('B') and context B calls dial('A'), the two
 * ports returned will be connected to one another.
 *
 * @param {string} name The name of the context to get.
 * @return {MessageChannel} The channel communicating with the
 *     given context. This is either a {@link goog.messaging.PortChannel} or a
 *     decorator around a PortChannel, so it's safe to send {@link MessagePorts}
 *     across it. This will be disposed along with the PortNetwork.
 */
PortNetwork.prototype.dial = function(name) {};


/**
 * The name of the service exported by the operator for creating a connection
 * between two callers.
 *
 * @type {string}
 * @const
 */
PortNetwork.REQUEST_CONNECTION_SERVICE = 'requestConnection';


/**
 * The name of the service exported by the callers for adding a connection to
 * another context.
 *
 * @type {string}
 * @const
 */
PortNetwork.GRANT_CONNECTION_SERVICE = 'grantConnection';
