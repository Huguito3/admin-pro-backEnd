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
  const _id = req.params.uid;
  const uid = req.uid;
  try {
    const hospital = await Hospital.findById(_id);
    if (!hospital) {
      res.status(404).json({
        ok: false,
        msg: "El Id no correspodne a un hospital de la base",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalAtualizado = await Hospital.findByIdAndUpdate(
      _id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalAtualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const deleteHospitales = async (req, res = response) => {
  const _id = req.params.uid;

  try {
    const hospital = await Hospital.findById(_id);
    if (!hospital) {
      res.status(404).json({
        ok: false,
        msg: "El Id no correspodne a un hospital de la base",
      });
    }

    const hospitalAtualizado = await Hospital.findByIdAndDelete(_id);
    //Seria mejor guardar el usuario y no eliminar fisicamente, si no crear una variabel de flag.
    res.json({
      ok: true,
      msg: "Hospital Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospitales,
};
