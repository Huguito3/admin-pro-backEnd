require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
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

// Directorio Publico. Ao executar a url no navegodr veremos nosso index html
app.use(express.static("public"));

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

// Si no es ningua de las anteriores rutas(esto lo hacemos porque incluimos en el public nuestra app angular)
// si no hacemos lo de abajo cuando damos F5 en nuestra app angular no encuentra las rutas, por eso lo forzamos a
// pasar por el index
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto: " + 3000);
});
