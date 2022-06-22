const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const urls = [
        {origin: 'www.google.com/jp1', shortURL: 'dasaskd1'},
        {origin: 'www.google.com/jp2', shortURL: 'dasaskd2'},
        {origin: 'www.google.com/jp3', shortURL: 'dasaskd3'},
        {origin: 'www.google.com/jp4', shortURL: 'dasaskd4'},
    ]
    res.render('home', { urls: urls })
})
 
module.exports = router