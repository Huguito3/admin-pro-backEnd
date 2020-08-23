const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    //Por un tema de seguridad no decimos lo que esta errado. Otro punto para mejorar la seguridad contra bombardeo.
    //Es que uando da error demorar la respues propositalmente en 1 segundo.
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email o contraseña invalida",
      });
    }

    //Verificar Contrasena
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "contrasena no valida",
      });
    }

    //Si esta todo ok debemos generar un JWT.
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const {name, email, picture} = await googleVerify(googleToken);
    res.json({
      ok: true,
      msg: "Google Sign In",
      name, email, picture
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

module.exports = { login, googleSignIn };
