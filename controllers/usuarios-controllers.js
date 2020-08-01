const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
// const { router } = require("../routes/usuarios-routes");

const getUsuarios = async (req, res) => {
  //Tambien podemos filtrar aqui lo que semuestra al usuario, salvo los campos que autoamticamente el mogno coloca
  const usuarios = await Usuario.find({}, "nombre email role google");
  res.json({
    ok: true,
    usuarios,
    uid: req.uid
  });
};

const createUsuarios = async (req, res) => {
  const { nombre, password, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }
    const usuario = new Usuario(req.body);

    //Encriptar Contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //save retorna promesa, por eso el async await
    await usuario.save();
    
    const token = await generarJWT(usuario.id);
    
    res.json({
      ok: true,
      usuario,
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email != email) {
      // si no esta modificando el email lo borramos
      //   delete campos.email;
      // } else {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe usuario con eses email",
        });
      }
    }
    // le anadimos el email modificado al objeto campos.
    campos.email = email;
    //borramos los campos que no queremos mmodificar en la base.
    // delete campos.password; Como fiz a desestructuracion({password, google, email,...campos} ), ya no preciso borrarlos
    // delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.uid;
    try {
      const usuarioDB = await Usuario.findById(uid);
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado",
        });
      }
      //Hoy en dia ya no se borra fisicamente, se acostumbra a tener un parametro que lo deja encendido o apagado
      // aca lo borramos fisicamente solo para test.
      await Usuario.findByIdAndDelete(uid);
  
      res.json({
        ok: true,
        msg: 'Usuario Borrado',
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado.. revisar logs",
      });
    }
  };


module.exports = { getUsuarios, createUsuarios, actualizarUsuario, borrarUsuario };
