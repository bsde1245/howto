---
---

var urlsToCache = [

{% for page in site.pages limit:30 %}
{% if page.url contains "page" %}
'{{ site.baseurl }}{{ page.url }}index.html',
{% endif %}
{% endfor %}
{% for post in site.posts limit:100 %}
'{{ site.baseurl }}{{ post.url }}',
{% endfor %}
'{{ site.baseurl }}/index.html'
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
