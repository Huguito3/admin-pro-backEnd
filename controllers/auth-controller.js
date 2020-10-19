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
    const { name, email, picture } = await googleVerify(googleToken);
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      // si entro aqui es porque existe el usuario
      usuario = usuarioDB;
      usuario.google = true;
      // esto es apra sobreescribir al contrasena y que solo use el login de google. Si se intenta loga con email y @@@ no funciona
      usuario.password = "@@@";
    }

    await usuario.save();
    // generamos el JWT de nuestra aplicacion

    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);

  res.json({
    ok: true,
    token: token
  });
}

module.exports = { login, googleSignIn, renewToken };
