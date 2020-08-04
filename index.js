require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

//Crear el servidor express
const app = express();
//Definimos el CORS, el use es un middleware.
app.use(cors());
//Lectura y parseo del body..tien que estar antes de la rutas.
app.use(express.json());
// Base de datos
dbConnection();
//Aqui se muestra todas las variables de entorno de node, incluso las que agregamos en nuestro archivo .env
// console.log(process.env);
// console.log(process.env.PORT)

// Rutas
//http://localhost:3000/
// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//     msg:'Funciona',
//   });
// });

//Rutas
app.use("/api/usuarios", require("./routes/usuarios-routes"));
app.use("/api/hospital", require("./routes/hospital-routes"));
app.use("/api/medicos", require("./routes/medico-routes"));
app.use("/api/todo", require("./routes/busquedas-routes"));
app.use("/api/upload", require("./routes/upload-route"));
app.use("/api/login", require("./routes/auth-routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto: " + 3000);
});
