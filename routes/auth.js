const express = require("express");
const { body } = require("express-validator");

const {
  loginForm,
  registerForm,
  registerUser,
  confirmAccount,
  loginUser,
  logoutSession,
} = require("../controllers/authController");

const router = express.Router();

//Se captura el body y se mandan los metodos de Express-Validator
router.get("/register", registerForm);
router.post(
  "/register",
  [
    body("userName", "Ingrese un nombre válido")
            .trim()
            .notEmpty() 
            .escape(),
        body("email", "Ingrese un email válido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Contraseña mínimo 6 carácteres")
            .trim()
            .isLength({ min: 6 })
            .escape()
            .custom((value, { req }) => {
                if (value !== req.body.passwordRepit) {
                    throw new Error("Password no coinciden");
                } else {
                    return value;
                }
            }),
  ],
  registerUser
);
router.get("/confirmar/:token", confirmAccount);
router.get("/login", loginForm);
router.post(
  "/login", [
      body("email", "Ingrese un email válido")
            .trim()
            .isEmail()
            .normalizeEmail(),
  body("password", "Contraseña minimo 6 carácteres")
            .trim()
            .isLength({ min: 6 })
            .escape()          
] , loginUser);

router.get('/logout', logoutSession)

module.exports = router;
