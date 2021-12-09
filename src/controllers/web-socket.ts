import WebSocket from 'ws';
import http from 'http';

export default class SocketServer {
    private readonly server: WebSocket.Server;

    private clients: WebSocket[] = [];

    constructor(serverTemplate: http.Server) {
        this.server = new WebSocket.Server({ server: serverTemplate });
        this.initListners();
    };

    private initListners() {
        this.server.on('connection', (socket: WebSocket) => {
            this.clients.push(socket);
            // DB adding

            socket.send('connected');

            this.initSocketListners(socket);
        });
    };

    private initSocketListners(socket: WebSocket) {
        socket.on('message', (message: string) => {
            
            // DB message adding
        });

        socket.on('close', () => {
            this.clients = this.clients.filter((client) => client !== socket);
            // DB deleting
        });

        socket.on('error', (err: Error) => console.log(err.message));
    };
};
