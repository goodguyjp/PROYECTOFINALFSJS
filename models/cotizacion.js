const mongoose = require('mongoose')
const {Schema} = mongoose

const cotiScheme = new Schema({
    userId: {
        type: String,
        lowercase: true,
        required: true
    },
    nombreProd: {
        type: String,
        lowercase: true,
        required: true,
    },
    cantidadProd: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Cotizacion', cotiScheme)