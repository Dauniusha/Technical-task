import { Schema, model } from 'mongoose';

const schema = new Schema({
    socket_id: {
        type: String,
        required: true,
    },
});

const Connection = model('Connection', schema);
export default Connection;
