---
---

var urlsToCache = [
    'index.html',
    '/assets/main.css',
'/about/index.html',
{% for paginator.page in paginator.total_pages %}
'/{{ paginator.page }}/index.html',
{% endfor %}
{% for post in site.posts limit:30 %}
'{{ site.baseurl }}{{ post.url }}',
{% endfor %}
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
