const mongoose = require('mongoose')
const {Schema} = mongoose

const productoSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,

    },
});

module.exports = mongoose.model('Productos', productoSchema)