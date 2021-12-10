export interface Message {
    'type': Type;
    'message': string;
};

export enum Type {
    state = 'status',
    message = 'message',
    common = 'common',
};
