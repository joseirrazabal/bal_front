import { skipWaiting, clientsClaim } from "workbox-core";
import { StaleWhileRevalidate } from "workbox-strategies";
import { registerRoute } from "workbox-routing";
import { precacheAndRoute } from "workbox-precaching";

skipWaiting();
clientsClaim();

registerRoute(
    new RegExp("^.*(/some-request-.+/).*$"),
    new StaleWhileRevalidate({
        cacheName: "api-cache",
    })
);

precacheAndRoute(self.__WB_MANIFEST);

