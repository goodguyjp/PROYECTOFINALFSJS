const express = require('express');
const { 
    agregarItem, 
    eliminarProd,
    agregarProd,
    leerProductos,
    leerCoti,
    finalizaCompra
} = require('../controllers/homeController');
const { formPerfil, editarFotoPerfil } = require('../controllers/perfilController');
const verificarUser = require('../middlewares/verificarUser');

const router = express.Router();

router.get('/leerCoti', leerCoti)
router.get('/', verificarUser, leerProductos)
router.post('/addCoti', verificarUser, agregarProd); 
router.post('/', verificarUser, agregarItem) 
router.post('/eliminar', verificarUser, eliminarProd)
router.get('/compra',verificarUser, finalizaCompra)

router.get('/perfil', verificarUser, formPerfil)
router.post('/perfil', verificarUser, editarFotoPerfil)

module.exports = router