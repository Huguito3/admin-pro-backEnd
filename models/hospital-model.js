//Modelo de Mongoose
//const mongoose = require('mongoose');  mongoose.Schema/mongoose.model
const { Schema, model } = require("mongoose");

const HospitalSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    image: { type: String },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  //Si no colocamos esto, coloca el plural en ingles del nombre del esquema Hospitals.
  { collection: "hospitales" }
);

//Revisar docuemntacao mongoose. Desestructuramos el retorno del json del mongo, trae datos como la version,
//que no la queremos.
HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});
//pór defecto mongoose coloca plural en la base de datos... usuario-> usuarios
module.exports = model("Hospital", HospitalSchema);
