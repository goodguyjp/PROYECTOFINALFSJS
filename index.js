const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const passport = require('passport')
const cors = require('cors')
const { create } = require('express-handlebars')
const User = require("./models/User");
require("dotenv").config();
const clientDB = require('./database/db')
// require('./database/db')

const app = express();


const corsOptions = {
  credentials: true,
  origin: process.env.PATHHEROKU || "*",
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions)) 

app.use(
  session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: false,
    name: "session-user",
    store: MongoStore.create({
        clientPromise: clientDB,
        dbName: process.env.DBNAME,
    }), 
    cookie: { secure: process.env.MODO === 'production', maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

// app.use(
//   session({
//     secret: process.env.SECRETSESSION,
//     resave: false,
//     saveUninitialized: false,
//     name: "session-user", 
   
//   })
// );

app.use(flash())
app.use(require("body-parser").json())
app.use(passport.initialize()) //
app.use(passport.session())

// Cuando se establece una sesión de inicio de sesión, la información sobre el usuario será
// almacenado en la sesión. Esta información es proporcionada por `serializeUser`
// función, que genera el ID de usuario y el nombre de usuario.
passport.serializeUser((user, done) => 

done(null, {id: user._id, userName: user.userName})
) //se va al req.user

passport.deserializeUser( async(user, done) => {

  const userDB = await User.findById(user.id)  //Llama al modelo del Usuario
  return done(null, {id: userDB._id, userName: userDB.userName})
})

// recibe las configuraciones de express-handlebars con extension .hbs
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

app.use("/", require("./routes/homerouter"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor en puerto: " + PORT);
});
