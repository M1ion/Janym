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
    photoUrl: {
        type: String,
        default: '63f7098394e3b1341b14b877'
    },
    coupleId:{
        type: String,
    },
    proposals: [{
        type: {type: ObjectId, ref: 'user'},
    }],
});

module.exports = model('user', userSchema)