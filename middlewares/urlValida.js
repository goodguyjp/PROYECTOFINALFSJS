const { URL } = require('url')
const urlValidar = (req, res, next) => {
    try {
        const { origin } = req.body
        const urlFrontend = new URL(origin)
        if(urlFrontend.origin !== "null") {
            if (
                urlFrontend.protocol === 'http:' ||
                urlFrontend.protocol === 'https:'
            ) {
                return next()
            }
        } 
        throw new Error("no valida ❌")    
    } catch (error) {
        return res.send('url no valida')
    }
}

module.exports = urlValidar