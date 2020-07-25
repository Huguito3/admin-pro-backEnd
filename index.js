
require('dotenv').config();
const express = require("express");
const cors = require('cors');

const {dbConnection} = require('./database/config');


//Crear el servidor express
const app = express();
//Definimos el CORS, el use es un middleware.
app.use(cors());
// Base de datos
// console.log(process.env.PORT)
dbConnection();
//Aqui se muestra todas las variables de entorno de node, incluso las que agregamos en nuestro archivo .env
// console.log(process.env);
// Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola Mundo",
  });
});
// console.log(process.env.DB_CCN)
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto: " + 3000);
});
