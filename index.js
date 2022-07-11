const express = require("express");
const session = require("express-session");
const flash = require('connect-flash')
const passport = require('passport')
const { create } = require("express-handlebars");
// const csrf = require('csurf')
const User = require("./models/User");
const jquery = require('jquery');
require("dotenv").config();
require("./database/db");

const app = express();

app.use(
  session({
    secret: "palabra secreta",
    resave: false,
    saveUninitialized: false,
    name: "secret-name-hola",
  })
);
app.use(flash())
app.use(require("body-parser").json())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => 

done(null, {id: user._id, userName: user.userName})
) //req.user

passport.deserializeUser( async(user, done) => {

  const userDB = await User.findById(user.id)  
  return done(null, {id: userDB._id, userName: userDB.userName})
})

const hbs = create({
  extname: ".hbs",
  partialsDir: ["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// app.use(csrf())

// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken()
//     res.locals.mensajes = req.flash('mensajes')
//     next()
// })

app.use("/", require("./routes/homeruta"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
});
