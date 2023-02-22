const { Schema, model, mongoose } = require('mongoose')

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
        type: Number
    }
})

module.exports = model('user', userSchema)