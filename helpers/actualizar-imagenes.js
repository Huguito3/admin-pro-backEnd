const fs = require("fs");

const Medico = require("../models/medico-model");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital-model");

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      console.log(medico);
      if (!medico) {
        console.log("No es un medico");
        return false;
      }

      const pathViejo = `./uploads/medicos/${medico.image}`;
      if (fs.existsSync(pathViejo)) {
        console.log("existe");
        //Si existe vorramos la anterior
        fs.unlinkSync(pathViejo);
      }
      medico.image = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "usuarios":
      break;
    case "hospitales":
      break;

    default:
      return false;
      break;
  }
};

module.exports = {
  actualizarImagen,
};
