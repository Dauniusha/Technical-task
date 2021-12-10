import factory from "./factory.js";

export default class App {
    constructor() {
        this.initHTML();
        this.initTypesHandlers();
        this.isConnect = false;
        this.changeConnectState();
    };

    initHTML() {
        this.container = factory.createElem(['container']);
        document.body.appendChild(this.container);

        this.input = factory.createInput(['message'], 'Enter your message');
        this.container.appendChild(this.input);

        this.sendBtn = factory.createElem(['btn', 'send-btn']);
        this.sendBtn.innerHTML = 'Send';
        this.container.appendChild(this.sendBtn);

        this.connectBtn = factory.createElem(['btn', 'connect-btn']);
        this.connectBtn.innerHTML = 'Disconnect';
        this.container.appendChild(this.connectBtn);
        this.connectBtn.addEventListener('click', () => this.changeConnectState());

        this.statusBtn = factory.createElem(['btn', 'status-btn']);
        this.statusBtn.innerHTML = '0';
        this.container.appendChild(this.statusBtn);
        this.statusBtn.addEventListener('click', () => this.send('status'));
    };

    changeConnectState() {
        this.isConnect ? this.webSocket?.close(1000, "Closed by user") : this.createSocketConnection();
        this.connectBtn.innerHTML = this.isConnect ? 'Connect' : 'Disconnect';
        this.isConnect = !this.isConnect;
    };

    initTypesHandlers() {
        this.handlers = {
            'status': (count) => this.statusBtn.innerHTML = count,
            'common': (message) => console.log(message),
        };
    };

    createSocketConnection() {
        this.webSocket = new WebSocket('ws://localhost:3000');

        this.webSocket.addEventListener('message', (message) => {
            const { type, data } = { type: 'common', data: message.data }// JSON.parse(message.data);
            this.handlers[type](data);
        });

        this.webSocket.addEventListener('close', () => {
            console.log('Socket has been closed');
            this.webSocket = null;
        });

        this.webSocket.addEventListener('error', (err) => {
            console.log(err);
        });
    };

    send(type, message) {
        const data = JSON.stringify({
            type,
            message,
        });
        
        this.webSocket?.send(data);
    };
};
