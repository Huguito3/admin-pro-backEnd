const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const Hospital = require("../models/hospital-model");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre image");

  res.json({
    ok: true,
    hospitales,
  });
};

const createHospital = async (req, res = response) => {
  //en el middleware lo estamos reobteniendo al uid a traves del token
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });
  try {
    const hospitaldb = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitaldb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const updateHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Update",
  });
};

const deleteHospitales = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Hospital",
  });
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospitales,
};
