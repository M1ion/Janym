const { Schema, model, mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    coupleId:{
        type: {type: ObjectId, ref: 'user'},
    },
    proposals: [{
        type: {type: ObjectId, ref: 'user'},
    }],
});

module.exports = model('user', userSchema)