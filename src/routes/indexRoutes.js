const express = require('express');
const router = express.Router();
const { reportarConsulta } = require("../middleware/reportarConsulta");
const indexControllers = require ("../controllers/indexControllers");

//ingresa con pasw encriptada Y PASW NORMAOL
router.post("/login", reportarConsulta, indexControllers.login)
//registra y guarda en bd
router.post("/usuarios", reportarConsulta, indexControllers.userRegistration)
router.get("/usuarios", reportarConsulta, indexControllers.showUser)//falta verificar usuario en esta ruta

module.exports = router;