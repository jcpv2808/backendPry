const express = require("express");
const cors = require("cors");
const dbConnect = require("./config");
const ModelCliente = require("./ClienteSchema");
const app = express();

const port = process.env.PORT || 4000;
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Hola Mundo");
});

// CRUD

// READ - one
router.get("/getDeuda/:dni", async (req, res) => {
    const dni = req.params.dni;
    const respuesta = await ModelCliente.findOne({dni});
    res.send(respuesta);
});

// CREATE
router.post("/nuevoCliente", async (req, res) => {
    const body = req.body;
    try {
        const respuesta = await ModelCliente.create(body);
        console.log("Cliente nuevo agregado: ", respuesta);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send({ message: "Error al agregar el Cliente." });
    }
});
// Habilitar CORS para todas las solicitudes
app.use(cors());

// Parseo de las solicitudes
app.use(express.json());

// Usa el router
app.use(router);

// Conexión a la base de datos usando el archivo de configuración config.js
dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log("Escuchando en el puerto:", port);
        });
    })
    .catch(error => {
        console.log("Error al conectar a la base de datos: ", error.message);
    });

