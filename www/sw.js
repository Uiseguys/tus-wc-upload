importScripts('workbox-v3.4.1/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

/*
  This is our code to handle push events.
*/
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker]121212121 Push had this data: "${event.data.text()}"`);

  const title = 'Push Notification';
  const options = {
    body: `${event.data.text()}`,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.workbox.precaching.precacheAndRoute([
  {
    "url": "assets/icon/arrow-pointing-up.svg",
    "revision": "e0e8439eb8069ed0c51327b2c81fb6b0"
  },
  {
    "url": "assets/icon/cancel.svg",
    "revision": "2e73c37c60919a126b246b767c1325d0"
  },
  {
    "url": "assets/icon/checked.svg",
    "revision": "4190ac1189db82bcbe4eddaa6a7908d7"
  },
  {
    "url": "assets/icon/circle-close.png",
    "revision": "5ec4e2f33fb0e875dd9455446c5c49cc"
  },
  {
    "url": "assets/icon/close-circle.svg",
    "revision": "e3dba22e1b269aa0eb17905e693e9b84"
  },
  {
    "url": "assets/icon/error-triangle.svg",
    "revision": "9476c3a8de74caab262c83faab0348a7"
  },
  {
    "url": "assets/icon/favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "assets/icon/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "assets/icon/pause-button.svg",
    "revision": "e8744d7f16a969d09c0e787a34ddbc70"
  },
  {
    "url": "assets/icon/pause.svg",
    "revision": "a0d38585a7f4a52325e7a5a6cf030c0d"
  },
  {
    "url": "assets/icon/play-button.svg",
    "revision": "8ab0f83b1b7218f6ce1e35df2d44866c"
  },
  {
    "url": "assets/icon/upload-button.svg",
    "revision": "e4860a2930f8d9ba08a7fc7b1808016c"
  },
  {
    "url": "assets/tus.js",
    "revision": "14ad90c7aa5226143bafa9e94e5222fa"
  },
  {
    "url": "assets/tus.min.js",
    "revision": "0f83ac90f5850b20f25fd3a536f66d9a"
  },
  {
    "url": "build/app.css",
    "revision": "e5e7bdbce663087be39a01d77daf7a40"
  },
  {
    "url": "build/app.js",
    "revision": "00270c0291db3c9ec2839240aac783f3"
  },
  {
    "url": "build/app/app.2fqu4uff.js",
    "revision": "d85414e2e15fb382be060e63a548f63d"
  },
  {
    "url": "build/app/app.30ti0ini.js",
    "revision": "df44fe23ed22348066584aae60bca8b0"
  },
  {
    "url": "build/app/xgxgmijn.entry.js",
    "revision": "5c6c7e1a62233523cafe21ee6e1ab563"
  },
  {
    "url": "build/app/xgxgmijn.es5.entry.js",
    "revision": "202eb772f4292f18237053451a4e215a"
  },
  {
    "url": "build/app/xgxgmijn.sc.entry.js",
    "revision": "5c6c7e1a62233523cafe21ee6e1ab563"
  },
  {
    "url": "build/app/xgxgmijn.sc.es5.entry.js",
    "revision": "202eb772f4292f18237053451a4e215a"
  },
  {
    "url": "index.html",
    "revision": "9e5e5a804c0282efc88f237721cb56bf"
  },
  {
    "url": "manifest.json",
    "revision": "7c36412b969b04775b83c35b5a092d12"
  }
]);