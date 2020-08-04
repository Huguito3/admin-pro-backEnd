const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const Medico = require("../models/medico-model");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
  .populate('usuario', 'nombre image')
  .populate('hospital', 'nombre');

  res.json({
    ok: true,
    medicos,
  });
};

const createMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });
  try {
    const medicodb = await medico.save();

    res.json({
      ok: true,
      medico: medicodb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const updateMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Update Medico",
  });
};

const deleteMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Medico",
  });
};

module.exports = { getMedicos, createMedico, updateMedico, deleteMedico };
