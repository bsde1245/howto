var urlsToCache = [
    'index.html',
    '/assets/main.css',
'/about/index.html',
'/posts/howto/2016/12/28/How-to-download-wikipedia-and-use-offline.html',
'/posts/howto/2016/12/08/how-to-type-malayalam-in-android-phone-easily.html',
'/posts/howto/2016/11/23/how-to-download-videos-from-youtube-without-any-software-easily.html',
'/posts/howto/2016/11/17/How-to-download-softwares-and-movies-files-from-torrent-sites.html',
'/posts/internet/2016/11/10/snapdeal-is-offering-10-discount-on-debit-credit-card-transactions.html',
'/contact/index.html'
];

var CACHE_NAME = 'progressive-hyde-cache-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return fetch(event.request).then(function (response) {
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});
