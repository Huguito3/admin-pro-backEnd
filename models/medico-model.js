//Modelo de Mongoose
//const mongoose = require('mongoose');  mongoose.Schema/mongoose.model
const { Schema, model } = require("mongoose");

const MedicoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    image: { type: String },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
      },
  }
);

//Revisar docuemntacao mongoose. Desestructuramos el retorno del json del mongo, trae datos como la version,
//que no la queremos.
MedicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});
//pór defecto mongoose coloca plural en la base de datos... usuario-> usuarios
module.exports = model("Medico", MedicoSchema);
