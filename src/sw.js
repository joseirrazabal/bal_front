import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration'

import { precacheAndRoute, matchPrecache } from 'workbox-precaching'
import { setCatchHandler } from 'workbox-routing'

// recarga
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.mode === 'navigate',
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: 'pages',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
)

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
)

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === 'image',
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  })
)

// Ensure your build step is configured to include /offline.html as part of your precache manifest.
precacheAndRoute(self.__WB_MANIFEST)

// Catch routing errors, like if the user is offline
setCatchHandler(async ({ event }) => {
  // Return the precached offline page if a document is being requested
  if (event.request.destination === 'document') {
    return matchPrecache('/offline.html')
  }

  return Response.error()
})

// import { ExpirationPlugin } from 'workbox-expiration'
// import { registerRoute } from 'workbox-routing'
// import { StaleWhileRevalidate } from 'workbox-strategies'
//
// import { registerRoute } from 'workbox-routing'
// import { StaleWhileRevalidate } from 'workbox-strategies'
//
// import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// import { CacheFirst } from 'workbox-strategies'
// import { ExpirationPlugin } from 'workbox-expiration'
// import { registerRoute } from 'workbox-routing'

// Cache Google Fonts with a stale-while-revalidate strategy, with
// a maximum number of entries.
// registerRoute(
//   ({ url }) =>
//     url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
//   new StaleWhileRevalidate({
//     cacheName: 'google-fonts',
//     plugins: [new ExpirationPlugin({ maxEntries: 20 })],
//   })
// )
//
// registerRoute(
//   ({ request }) => request.destination === 'script' || request.destination === 'style',
//   new StaleWhileRevalidate()
// )
//
// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// )

/*
import * as googleAnalytics from "workbox-google-analytics";
import { ExpirationPlugin } from "workbox-expiration";
import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from "workbox-precaching";
import { CacheFirst } from "workbox-strategies";
import { NavigationRoute, registerRoute } from "workbox-routing";

registerRoute(
    new RegExp("/gen/real-player-data-*"),
    new CacheFirst({
        cacheName: "real-player-data",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1,
                purgeOnQuotaError: true,
            }),
        ],
    }),
);

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(handler, {
    denylist: [
        new RegExp("^/files"),
        new RegExp("^/fonts"),
        new RegExp("^/gen"),
        new RegExp("^/ico"),
        new RegExp("^/img"),
        new RegExp("^/manifest"),
        new RegExp("^/sw.js"),
    ],
});
registerRoute(navigationRoute);

cleanupOutdatedCaches();

googleAnalytics.initialize();
*/

// import { skipWaiting, clientsClaim } from 'workbox-core'
// import { StaleWhileRevalidate } from 'workbox-strategies'
// import { registerRoute } from 'workbox-routing'
// import { precacheAndRoute } from 'workbox-precaching'
//
// skipWaiting()
// clientsClaim()
//
// registerRoute(
//   new RegExp('^.*(/some-request-.+/).*$'),
//   new StaleWhileRevalidate({
//     cacheName: 'api-cache',
//   })
// )
//
// precacheAndRoute(self.__WB_MANIFEST)

/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

/*
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

clientsClaim()

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST)

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    }

    // Return true to signal that we want to use the handler.
    return true
  },
  // createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
  createHandlerBoundToURL('index.html')
)

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 })
    ]
  })
)

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Any other custom service worker logic can go here.
*/
