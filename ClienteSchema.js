const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
    {
        dni: {
            type: String,
            required: true,
            unique: true
        },
        deuda: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Define correctamente el nombre de la constante como ModelCliente
const ModelCliente = mongoose.model("clientePry", ClienteSchema);
module.exports = ModelCliente;
