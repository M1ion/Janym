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
      photoUrl: {
        type: String,
        default: 'https://photos-kr.kcdn.kz/content/2d/1651260b5e7158fe3b-909-1-0-2021v-gorah-almaty-postroyat-15-hizhin-dlya-ukrytiya-turistov.jpg',
      },
      coupleId: [
        {
          type: String,
          required: true,
        },
      ]
})

module.exports = model('event', eventSchema)