const { Schema, model, mongoose } = require('mongoose')

const desireSchema = new Schema({
    coupleId: {
        type: String, 
        required: true
    },
    desireText:{
        type: String,
    },
    status: {
        type: String,
    },
})

module.exports = model('desire', desireSchema)