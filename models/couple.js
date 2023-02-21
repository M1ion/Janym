const { Schema, model, mongoose } = require('mongoose')

const coupleSchema = new Schema({
    person1: {
        type: String,
        required: true
    },
    person2:{
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }
})

module.exports = model('couple', coupleSchema)