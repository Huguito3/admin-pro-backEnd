const { request } = require("express");
const jwt = require("jsonwebtoken");

// A importação do request, e so para importar o modelo do parametro. Ajuda a vr os metodos que tem.
const validarJWT = (req = request, res, next) => {
  //Leer el token..Nombre que le voy a dar en el header.
  const token = req.header("x-token");
  if (!token) {
    return res.status(404).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const {uid} = jwt.verify(token, process.env.JWT_TOKEN);
    //Estamos em um middlewre que se va a ejecutar ante sdel obtener usuario
    //Aqyu obtenems el uid del token que la persona hizo en el login, y lo grabamos en la req para que se peuda utilizar en 
    //algun metodo mas adelante
    req.uid =uid;  

  } catch (error) {
    return res.status(404).json({
        ok: false,
        msg: "Token incorreto",
      });
  }

  next();
};

module.exports = {
  validarJWT,
};
