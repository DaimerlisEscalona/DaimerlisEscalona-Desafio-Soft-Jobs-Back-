const pool = require("../dataBase/db");
const bcrypt = require('bcryptjs')

const verificarCredenciales = async (email, password) => {
    const values = [email, password]
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2"
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }

}

const registrarUsuario = async (usuario, res) => {
    //const salt = 
    
    const { email, password, rol, lenguage } = usuario
    
    if (![email, password, rol, lenguage].includes("")) {
        
        const passwordEncriptada = bcrypt.hashSync(password);
        console.log("registrar usuarios")
        password = passwordEncriptada
        
        const values = [email, passwordEncriptada, rol, lenguage]
        
        const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)"
        await pool.query(consulta, values)
        res.send("Usuario creado con éxito")
        
    } else {
        res.status(500).send("Debe ingresar todos los datos")
    }
}

const mostrarUsuarios = async (email) => {
    try {
        
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const values = [email];
        const { rows } = await pool.query(consulta, values);
       // console.log("entre" + rows)
        return rows[0];
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = { verificarCredenciales, registrarUsuario, mostrarUsuarios };