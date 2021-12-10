import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import mongoose from 'mongoose';

import setting from './setting';
import SocketServer from './controllers/web-socket';

const app = express();
const server = http.createServer(app);

const webSocketServer = new SocketServer(server);

app.use('/', (req, res) => res.send('<h1>Hello</h1>'));

async function init() {
    try {
        await mongoose.connect(setting.mongoUri);
        server.listen(process.env.PORT || 3000, () => console.log('Server started on the port', server.address()));
    } catch (err) {
        console.log('Error with server:', (err as Error).message);
        process.exit(1);
    };
}

init();
