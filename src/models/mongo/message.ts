import { Schema, model } from 'mongoose';

const schema = new Schema({
    socket_id: {
        type: String,
        required: true,
    },
    
    message: {
        type: String,
        required: true,
    },
});

const DBMessage = model('Message', schema);
export default DBMessage;
