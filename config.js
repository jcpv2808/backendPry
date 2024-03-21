const mongoose = require("mongoose")
//creacion de funcion para conexion a la base de datos
const dbConnect = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/alumnos_pruebas")
        console.log("conexion a la base de datos exitosa")
    } catch (error) {
        console.log("error al conectar a la base de datos: ", error.message)
    }
}

module.exports = dbConnect