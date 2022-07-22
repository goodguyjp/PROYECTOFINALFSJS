//Verifica si el usuario tiene una sesion activa, si no, redirige al Login (un pocop ordinario el middleware pero sirve xd)
module.exports = (req, res, next) => {
    if(req.isAuthenticated()) {
         return next()
    }
    res.redirect('/auth/login')
}