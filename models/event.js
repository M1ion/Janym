const { Schema, model, mongoose } = require('mongoose')

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: new Date().toISOString().slice(0, 19).replace('T', ' '), 
      },
      occasion: {
        type: String,
        required: true
      },
      photoURI: {
        type: String,
        required: true
      },
      coupleId: {
        type: Number,
        required: true
      }
})

module.exports = model('event', eventSchema)