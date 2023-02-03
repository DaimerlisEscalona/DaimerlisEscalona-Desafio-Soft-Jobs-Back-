const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { verificarCredenciales, registrarUsuario, mostrarUsuarios } = require("../services/consultas");
dotenv.config({ path: './src/.env' });

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 60 })
        res.send(token)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
};

const userRegistration = async (req, res) => {
    try {
        const usuario = req.body
        await registrarUsuario(usuario, res)
    } catch (error) {
        res.status(error);
    }
}

const showUser = async (req, res) => {
    try {
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token, JWT_SECRET)
        const { email } = jwt.decode(token)
        const data = await mostrarUsuarios(email)
        res.send(data)
    } catch (error) {
        res.status(500).send("No es posible obtener la información solicitada");
    }
}

module.exports = { login, userRegistration, showUser };