const mongoose = require("mongoose")
const AlumnoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        apellido: {
            type: String
        },
        email: {
            type: String
        }
    },{
        timestamps: true,
        versionKey: false
    }
)

const ModelAlumno = mongoose.model("alumno", AlumnoSchema)
module.exports = ModelAlumno