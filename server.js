import express from 'express';
import http from 'http';
import { wisp } from 'wisp-server-node';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { epoxyPath } from '@mercuryworkshop/epoxy-tls/node';

const app = express();
const server = http.createServer(app);

// Serve our website files
app.use(express.static('public'));

// Serve Scramjet proxy files
app.use('/scramjet/', express.static(scramjetPath));
app.use('/baremux/', express.static(baremuxPath));
app.use('/epoxy/', express.static(epoxyPath));

// Handle proxy connections
server.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Scramjet running on port ${PORT}`);
});
