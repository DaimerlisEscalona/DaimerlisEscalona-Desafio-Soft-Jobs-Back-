const jwt = require("jsonwebtoken");
const usuariosService = require('../services/usuarios')

const verificarUsuario = async (req, res, next) => {
    try {
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        const { email } = jwt.verify(token, process.env.JWT_SECRET)
        const usuario = await usuariosService.findOne(email)
        req.usuario = usuario[0];
        next();
    } catch (error) {
        res.status(400).send("Algo salió mal...")
    }
}

module.exports = { verificarUsuario };