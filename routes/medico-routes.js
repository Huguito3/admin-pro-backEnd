/*
    Ruta: './routes/medico-routes'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medico-controller");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getMedicos);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El nombre del hospital es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe de ser valido").isMongoId(),
    validarCampos,
  ],
  createMedico
);

router.put("/:uid", [ validarJWT], updateMedico);

router.delete("/:uid", validarJWT, deleteMedico);

module.exports = router;
