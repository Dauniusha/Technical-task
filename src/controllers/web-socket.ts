import WebSocket from 'ws';
import http from 'http';
import { Message, Type } from '../models/message';
import HandlerOprions from '../models/handler-options';
import Client from '../models/client';
import DBMessage from '../models/mongo/message';
import Connection from '../models/mongo/conection';

export default class SocketServer {
    private readonly server: WebSocket.Server;

    private readonly handlers;

    private clients: Client[] = [];

    constructor(serverTemplate: http.Server) {
        this.server = new WebSocket.Server({ server: serverTemplate });
        this.initListners();
        this.handlers = this.initHandlers();
    };

    private initListners() {
        this.server.on('connection', (socket: WebSocket) => {
            const socket_id = this.getId();

            const client = { socket, socket_id };
            this.clients.push(client);
            
            const connection = new Connection({ socket_id });
            connection.save(() => console.log('Client saved, id:', socket_id));

            client.socket.send('connected');

            this.initSocketListners(client);
        });
    };

    private getId() {
        return Date.now().toString(16) + '_' + Math.floor(Math.random() * 1000).toString(16);
    };

    private initHandlers() {
        return {
            [ Type.state ]: (options: HandlerOprions) => options.client?.socket.send(String(this.clients.length)),
            [ Type.message ]: (options: HandlerOprions) => this.addMessage(options),
            [ Type.common ]: (options: HandlerOprions) => console.log('Common message:', options.data),
        };
    };

    private initSocketListners(client: Client) {
        const { socket } = client;

        socket.on('message', (data: string) => {
            console.log(data);
            const { type, message } = JSON.parse(data) as Message;
            this.handlers[type]({ client, data: message });
        });

        socket.on('close', async () => {
            this.clients = this.clients.filter((data) => data !== client);
            
            await new Promise<void>((resolve) => DBMessage.deleteMany(
                    { socket_id: client.socket_id },
                    () => {
                        console.log('Messages deleted, socket_id:', client.socket_id);
                        resolve();
                    }
                )
            );

            await new Promise<void>((resolve) => Connection.deleteOne(
                    { socket_id: client.socket_id },
                    () => {
                        console.log('Connection deleted, socket_id:', client.socket_id);
                        resolve();
                    }
                )
            );
        });

        socket.on('error', (err: Error) => console.log(err.message));
    };

    private addMessage(options: HandlerOprions) {
        const message = new DBMessage({
            socket_id: options.client?.socket_id,
            message: options.data,
        });

        message.save(() => console.log('Message save:', message));
    }
};
