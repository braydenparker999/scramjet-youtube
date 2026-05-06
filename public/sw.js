importScripts('/scramjet/scramjet.worker.js');
importScripts('/scramjet/scramjet.sync.js');

const scramjet = new ScramjetController({
    prefix: '/scram/',
    bareClients: ['/wisp/'],
    encodeUrl: scramjet.codecs.xor.encode,
    decodeUrl: scramjet.codecs.xor.decode,
});

self.addEventListener('fetch', (event) => {
    if (scramjet.route(event)) {
        event.respondWith(scramjet.fetch(event));
    }
});
