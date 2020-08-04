/*
./routes/hospital-routes
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospitales,
} = require("../controllers/hospital-controller");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getHospitales);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos
  ],
  createHospital
);

router.put("/:uid", [ validarJWT], updateHospital);

router.delete("/:uid", validarJWT, deleteHospitales);

module.exports = router;
