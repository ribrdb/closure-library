/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for manipulating message channels.
 */

const { MessageChannel } = goog.requireType('goog.messaging.messagechannel');


/**
 * Creates a bidirectional pipe between two message channels.
 *
 * @param {MessageChannel} channel1 The first channel.
 * @param {MessageChannel} channel2 The second channel.
 */
export function pipe(channel1, channel2) {
 channel1.registerDefaultService(goog.bind(channel2.send, channel2));
 channel2.registerDefaultService(goog.bind(channel1.send, channel1));
}
