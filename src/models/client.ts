import WebSocket from "ws";

export default interface Client {
    socket: WebSocket;
    socket_id: string;
};
