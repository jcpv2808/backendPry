const mongoose = require("mongoose")
//creacion de funcion para conexion a la base de datos
const uri = "mongodb+srv://xljeanlx:jeanwow1234@jcapi.dlb0iyx.mongodb.net"
const dbConnect = async ()=>{
    try {
        await mongoose.connect(`${uri}/puntaje`)
        console.log("conexion a la base de datos exitosa")
    } catch (error) {
        console.log("error al conectar a la base de datos: ", error.message)
    }
}

module.exports = dbConnect