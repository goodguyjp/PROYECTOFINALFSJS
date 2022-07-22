const User = require("../models/User");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();

const registerForm = (req, res) => {
  res.render("register", {
    mensajes: req.flash("mensajes"),
  });
};

const loginForm = (req, res) => {
  res.render("login", { mensajes: req.flash("mensajes") });
};
// HU 1, Yo como visitante quiero registrarme en el sitio y ser un usuario registrado
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/register");
    // return res.json(errors)
  }

  const { userName, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) throw new Error("ya existe el usuario");

    user = new User({ userName, email, password, tokenConfirm: uuidv4() });
    await user.save();

    // enviar correo electronico con la confirmacion de la cuenta (como no tengo un hosting contratado, ocupare mailtrap)
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSEMAIL,
      },
    });

    await transport.sendMail({
      from: '"Fred Foo" <foo@example.com>',
      to: user.email,
      subject: "Verifica tu cuenta de correo",
      html: `<a href="${
        process.env.PATHHEROKU || "http://localhost:5000"
      }/auth/confirmar/${user.tokenConfirm}">Verifica tu cuenta aqui</a>`,
    });

    req.flash("mensajes", [
      { msg: "Revisa tu correo electronico para validar cuenta" },
    ]);
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/auth/register");
    // res.json({error: error.message})
  }
};

const confirmarCuenta = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ tokenConfirm: token });
    if (!user) throw new Error("No existe este usuario");

    user.cuentaConfirmada = true;
    user.tokenConfirm = null;

    await user.save();

    req.flash("mensajes", [
      { msg: "Cuenta verificada, puedes iniciar sesión." },
    ]);
    return res.redirect("/auth/login");
  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/auth/login");
    // res.json({ error: error.message })
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/login");
  }

  const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
    if (!user) throw new Error("No existe este email");

    if (!user.cuentaConfirmada) throw new Error("Falta confirmar cuenta");

    if (!(await user.comparePassword(password)))
      throw new Error("Contraseña incorrecta");

    //Creando la sesion de usuario a traves de passport, se manda el 'user' al SerializeUser, se verifica que exista el usuario, si no, cae en el Error del If
    req.login(user, function (err) {
      if (err) {
        throw new Error("Error al crear la sesion");
      }
      return res.redirect("/");
    });
  } catch (error) {
    //cuando no existe el email,cae al catch y se hace la sesion el flash y se hace el redirect
    // console.log(error);
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/auth/login");
    // return res.send(error.message)
  }
};

const cerrarSesion = (req, res) => {
  req.logout(() => {
    return res.redirect("/auth/login");
  });
};

module.exports = {
  loginForm,
  registerForm,
  registerUser,
  confirmarCuenta,
  loginUser,
  cerrarSesion,
};
