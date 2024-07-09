const mongoose = require("mongoose")
const PuntajeSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true
        },
        puntaje: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelPuntaje = mongoose.model("puntaje", PuntajeSchema)
module.exports = ModelPuntaje