const mongoose = require('mongoose')
const uuid = require('uuid');
const {Schema} = mongoose

const urlSchema = new Schema({
    origin:{
        type: String,
        unique: true,
        required: true
    },
    shortURL: {
        type: String,
        unique: true,
        required: true,
        default: uuid.v1().slice(0,8) 
    }
})
const Url = mongoose.model('Url', urlSchema)
module.exports = Url