const express = require('express');
const router = express.Router();
const { reportarConsulta } = require("../middleware/reportarConsulta");
const indexControllers = require ("../controllers/indexControllers");

router.post("/login", reportarConsulta, indexControllers.login)
router.post("/usuarios", reportarConsulta, indexControllers.userRegistration)
router.get("/usuarios/:id", reportarConsulta, indexControllers.showUser)

module.exports = router;