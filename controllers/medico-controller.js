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
  const _id = req.params.uid;
  const uid = req.uid;
  try {
    const medico = await Medico.findById(_id);
    if (!medico) {
      res.status(404).json({
        ok: false,
        msg: "El id no corresponde a un medico de la base",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoAtualizado = await Medico.findByIdAndUpdate(
      _id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: medicoAtualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

const deleteMedico = async (req, res = response) => {
  const _id = req.params.uid;

  try {
    const medico = await Medico.findById(_id);
    if (!medico) {
      res.status(404).json({
        ok: false,
        msg: "El Id no correspodne a un medico de la base",
      });
    }

   await Medico.findByIdAndDelete(_id);
    //Seria mejor guardar el usuario y no eliminar fisicamente, si no crear una variabel de flag.
    res.json({
      ok: true,
      msg: "Medico Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado.. revisar logs",
    });
  }
};

module.exports = { getMedicos, createMedico, updateMedico, deleteMedico };
