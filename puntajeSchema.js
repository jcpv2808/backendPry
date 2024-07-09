const mongoose = require("mongoose")
const PuntajeSchema = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        puntaje: {
            type: Number
        }
    },{
        timestamps: true,
        versionKey: false
    }
)

const ModelPuntaje = mongoose.model("puntaje", PuntajeSchema)
module.exports = ModelPuntaje