/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Simple image loader, used for preloading.
 */

import { Promise } from '../../promise/promise.js';

import { dispose } from '../../disposable/dispose.js';
import { EventHandler } from '../../events/eventhandler.js';
import { EventType } from '../../events/eventtype.js';
import { SafeUrl } from '../../html/safeurl.js';
import { EventType as netEventType } from '../../net/eventtype.js';
import * as userAgent from '../../useragent/useragent.js';


/**
 * Loads a single image.  Useful for preloading images.
 *
 * @param {!SafeUrl|string} uri URI of the image.
 * @param {(!Image|function(): !Image)=} opt_image If present, instead of
 *     creating a new Image instance the function will use the passed Image
 *     instance or the result of calling the Image factory respectively. This
 *     can be used to control exactly how Image instances are created, for
 *     example if they should be created in a particular document element, or
 *     have fields that will trigger CORS image fetches.
 * @return {!Promise<!Image>} A Promise that will be resolved with the
 *     given image if the image successfully loads.
 */
export function load(uri, opt_image) {
  return new Promise(/**
                * @suppress {strictPrimitiveOperators} Part of the
                * go/strict_warnings_migration
                */
               function(resolve, reject) {
                 let image;
                 if (opt_image === undefined) {
                   image = new Image();
                 } else if (typeof opt_image === 'function') {
                   image = opt_image();
                 } else {
                   image = opt_image;
                 }

                 // IE's load event on images can be buggy.  For older browsers,
                 // wait for readystatechange events and check if readyState is
                 // 'complete'. See:
                 // http://msdn.microsoft.com/en-us/library/ie/ms536957(v=vs.85).aspx
                 // http://msdn.microsoft.com/en-us/library/ie/ms534359(v=vs.85).aspx
                 //
                 // Starting with IE11, start using standard 'load' events.
                 // See:
                 // http://msdn.microsoft.com/en-us/library/ie/dn467845(v=vs.85).aspx
                 const loadEvent =
                     (userAgent.IE && userAgent.VERSION < 11) ?
                     netEventType.READY_STATE_CHANGE :
                     EventType.LOAD;

                 const handler = new EventHandler();
                 handler.listen(
                     image,
                     [
                       loadEvent, netEventType.ABORT,
                       netEventType.ERROR
                     ],
                     function(e) {
                       // We only registered listeners for READY_STATE_CHANGE
                       // for IE. If readyState is now COMPLETE, the image has
                       // loaded. See related comment above.
                       if (e.type == netEventType.READY_STATE_CHANGE &&
                           image.readyState != netEventType.COMPLETE) {
                         return;
                       }

                       // At this point, we know whether the image load was
                       // successful and no longer care about image events.
                       dispose(handler);

                       // Whether the image successfully loaded.
                       if (e.type == loadEvent) {
                         resolve(image);
                       } else {
                         reject(null);
                       }
                     });

                 // Initiate the image request.
                 image.src = uri;
               });
}
