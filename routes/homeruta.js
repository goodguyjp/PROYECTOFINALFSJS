const express = require('express');
const { 
    leerUrls,
    agregarUrl, 
    eliminarUrl, 
    editarUrlForm,
    editarUrl,
    agregarProd,
    leerProductos,
    redireccionamiento,
    leerCoti
} = require('../controllers/homeController');
const urlValidar = require('../middlewares/urlValida');
const verificarUser = require('../middlewares/verificarUser');

const router = express.Router();

router.get('/leerCoti', leerCoti)
router.get('/', verificarUser, leerProductos)
router.post('/addCoti', verificarUser, agregarProd);    
router.get('/', verificarUser, leerUrls); 
router.post('/', verificarUser, urlValidar, agregarUrl) 
router.get('/eliminar/:id', verificarUser, eliminarUrl)
router.get('/editar/:id', verificarUser, editarUrlForm)
router.post('/editar/:id', verificarUser, urlValidar, editarUrl)
router.get('/:shortURL', redireccionamiento)

module.exports = router