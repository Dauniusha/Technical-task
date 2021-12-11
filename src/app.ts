import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import setting from './setting';
import SocketServer from './controllers/web-socket';

const app = express();
const server = http.createServer(app);

async function init() {
    try {
        await mongoose.connect(setting.mongoUri);
        const webSocketServer = new SocketServer(server);
        server.listen(process.env.PORT || 3000, () => console.log('Server started on the port', server.address()));
    } catch (err) {
        console.log('Error with server:', (err as Error).message);
        process.exit(1);
    };
}

init();
