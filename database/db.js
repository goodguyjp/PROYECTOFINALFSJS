const mongoose = require('mongoose')
require('dotenv').config()

const clientDB = mongoose.connect(process.env.URI) 
    .then((m) =>{
        console.log('Db conectada ✔');
        return m.connection.getClient()
    } )
    .catch((e) => console.log('Fallo en la conexion ' + e))

module.exports = clientDB