const mongoose = require('mongoose')
const { v4: uuidv4 } = require("uuid");
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
        default: uuidv4().slice(0,8) 
    },
    user:{
       type: Schema.Types.ObjectId 
    },
})
const Url = mongoose.model('Url', urlSchema)
module.exports = Url