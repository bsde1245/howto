---
---

var urlsToCache = [
    'index.html',
    '/css/main.css',
'/about/index.html',
{% for page in site.pages limit:30 %}
{% if page.url contains "page" %}
'{{ page.url }}index.html',
{% endif %}
{% endfor %}
{% for post in site.posts limit:100 %}
'{{ site.baseurl }}{{ post.url }}',
{% endfor %}
'/contact/index.html'
];

var CACHE_NAME = 'keralahost';

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
