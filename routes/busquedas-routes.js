/*
Path: /api/todo/:busquedas
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getTodos,
  getDocumentosColeccion
} = require("../controllers/busqueda-controller");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/:busquedas", validarJWT, getTodos);
router.get("/coleccion/:tabla/:busquedas", validarJWT, getDocumentosColeccion);
module.exports = router;
