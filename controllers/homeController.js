const Url = require('../models/Url')
const { v4: uuidv4 } = require("uuid");
const productos = require('../models/productos')

const leerUrls = async (req, res) => {
    // console.log(req.user);
    try {

        const producto = await productos.find({user: req.user.id}).lean()
        const urls = await Url.find().lean()
        res.render('home', { urls: urls, productos: producto})

    } catch (error) {
        // console.log(error);
        // res.send('fallo algo...')   
        req.flash('mensajes', [{ msg: error.message }])
        return res.redirect('/')     
    }    
}

const agregarUrl = async (req, res) => {
    const { origin } = req.body

    try {
        const url = new Url({ origin: origin, shortURL: uuidv4().slice(0,8), user: req.user.id, productos: producto })
        // const producto = await productos.find({user: req.user.id}).lean()
        // res.render('home', { urls: urls, productos: producto })
        await url.save()
        req.flash('mensajes', [{ msg: "Url agregada" }])
        res.redirect('/')
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }])
        return res.redirect('/')
    }
}

const agregarProd = async (req, res) => {
    try {
        console.log("asdf", req.body);
    } catch (error) {
    }
}

const eliminarUrl = async( req, res) => {
    const {id} = req.params
    try {
        
        await Url.findByIdAndDelete(id)
        res.redirect('/')

    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }])
        return res.redirect('/')
    }
}

const editarUrlForm = async(req, res) => {
    const {id} = req.params
    try {
        
        const url = await Url.findById(id).lean()
        res.render('home', {url})
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }])
        return res.redirect('/')
}}

const editarUrl = async(req, res) => {
    const {id} = req.params
    const {origin} = req.body
    try {
        await Url.findByIdAndUpdate(id, {origin: origin})     
        res.redirect('/')  
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }])
        return res.redirect('/')
}}

const redireccionamiento = async (req, res) => {
    const {shortURL} = req.params
    console.log(shortURL);
    try {
        const urlDB = await Url.findOne({shortURL: shortURL})
        res.redirect(urlDB.origin)
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }])
        return res.redirect('/')
    }
}

module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento,
    agregarProd
}