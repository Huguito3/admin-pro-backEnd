const fs = require("fs");

const Medico = require("../models/medico-model");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital-model");

const borrarImagen = (pathViejo) => {
  if (fs.existsSync(pathViejo)) {
    //Si existe vorramos la anterior
    fs.unlinkSync(pathViejo);
  }
};
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = "";
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      console.log(medico);
      if (!medico) {
        console.log("No es un medico");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.image}`;
      borrarImagen(pathViejo);

      medico.image = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      console.log(usuario);
      if (!usuario) {
        console.log("No es un usuario");
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.image}`;
      borrarImagen(pathViejo);

      usuario.image = nombreArchivo;
      await usuario.save();
      return true;
      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        console.log("No es un hospital");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.image}`;
      borrarImagen(pathViejo);

      hospital.image = nombreArchivo;
      await hospital.save();
      return true;
      break;

    default:
      return false;
      break;
  }
};

module.exports = {
  actualizarImagen,
};
