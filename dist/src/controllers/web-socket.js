"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var SocketServer = /** @class */ (function () {
    function SocketServer(serverTemplate) {
        this.clients = [];
        this.server = new ws_1.default.Server({ server: serverTemplate });
        this.initListners();
    }
    ;
    SocketServer.prototype.initListners = function () {
        var _this = this;
        this.server.on('connection', function (socket) {
            _this.clients.push(socket);
            // DB adding
            socket.send('connected');
            _this.initSocketListners(socket);
        });
    };
    ;
    SocketServer.prototype.initSocketListners = function (socket) {
        var _this = this;
        socket.on('message', function (message) {
            // DB message adding
        });
        socket.on('close', function () {
            _this.clients = _this.clients.filter(function (client) { return client !== socket; });
            // DB deleting
        });
        socket.on('error', function (err) { return console.log(err.message); });
    };
    ;
    return SocketServer;
}());
exports.default = SocketServer;
;
