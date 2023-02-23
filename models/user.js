const { Schema, model, mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    DateOfBirth: {
        type: Date
    },
    gender: {
        type: String
    },
    country: {
        type: String
    }, 
    city: {
        type: String
    },
    bio: {
        type: String
    },
    socalMedia: {
        type: String
    },
    phoneNumber: {
        type: String
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
        default: '63f71fbb2b9122483fc2aee6'
    },
    coupleId:{
        type: String,
    },
    proposals: [{
        type: {type: ObjectId, ref: 'user'},
    }],
});

module.exports = model('user', userSchema)