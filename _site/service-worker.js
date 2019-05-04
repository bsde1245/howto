                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/js/footer.js","revision":"b3f41834b1eb54df1a50d30c2bde6556"},{"url":"/js/lunr.min.js","revision":"57fc8edbd9ac8ed0e94dbfca3f722ea8"},{"url":"/js/search.js","revision":"8043965b6a3727e172b7b4b7f03a4bc0"},{"url":"/index.html","revision":"efa663b5bee6bf3b71a3daa50b694b0e"},{"url":"/howto/2016/12/28/How-to-download-wikipedia-and-use-offline.html","revision":"16aaca7174ea6c0fb20e7258f6898432"},{"url":"/howto/2016/12/08/how-to-type-malayalam-in-android-phone-easily.html","revision":"f648f26613ff54d460b07daf4b7bfa83"},{"url":"/howto/2016/11/23/how-to-download-videos-from-youtube-without-any-software-easily.html","revision":"7e006a4803d1cb44f4a40e09d11bbb84"},{"url":"/howto/2016/11/17/How-to-download-softwares-and-movies-files-from-torrent-sites.html","revision":"69c43b33d24b9d54c3202c1cccf7a94b"},{"url":"/howto/2016/11/16/How-to-take-screenshot-of-monitor-screen.html","revision":"6d4bc63c8dde28e06a3dacc8505f24e2"}];
            // service-worker.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'my-blog',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.networkFirst()
);

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
    /assets\/(img|icons)/,
    workbox.strategies.cacheFirst()
);

// third party files
workbox.routing.registerRoute(
    /^https?:\/\/cdn.staticfile.org/,
    workbox.strategies.staleWhileRevalidate()
);

