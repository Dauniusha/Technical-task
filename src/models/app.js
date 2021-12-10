import factory from "./factory.js";

export default class App {
    constructor() {
        this.initHTML();
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
        this.connectBtn.innerHTML = 'Connect';
        this.container.appendChild(this.connectBtn);

        this.statusBtn = factory.createElem(['btn', 'status-btn']);
        this.statusBtn.innerHTML = '0';
        this.container.appendChild(this.statusBtn);
    };
};
