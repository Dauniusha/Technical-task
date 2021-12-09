import factory from "./factory";

export default class App {
    constructor() {
        this.container = factory.createElem('container');
        document.body.appendChild(this.container);

        this.input = factory.createInput('message', 'Enter your message');
        this.container.appendChild(this.input);

        this.sendBtn = factory.createElem('send-btn');
        this.container.appendChild(this.sendBtn);

        this.connectBtn = factory.createElem('connect-btn');
        this.container.appendChild(this.connectBtn);

        this.statusBtn = factory.createElem('status-btn');
        this.container.appendChild(this.statusBtn);
    };
};
