const express = require("express");
const cors = require("cors");
const dbConnect = require("./config");
const ModelPuntaje = require("./puntajeSchema");
const app = express();

const port = process.env.PORT || 4000;
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Hola Mundo");
});

// CRUD

// CREATE
router.post("/nuevoPuntaje", async (req, res) => {
    const body = req.body;
    try {
        const respuesta = await ModelPuntaje.create(body);
        console.log("Puntaje nuevo agregado: ", respuesta);
        res.send(respuesta);
    } catch (error) {
        if (error.code === 11000) {
            // Código de error 11000 es para errores de duplicado en Mongoose
            res.status(400).send({ message: "El nombre ya existe. Por favor, elija otro nombre." });
        } else {
            res.status(500).send({ message: "Error al agregar el puntaje." });
        }
    }
});

// READ - one
router.get("/getPuntaje/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelPuntaje.findById(id);
    res.send(respuesta);
});

// READ - all
router.get("/getAllPuntajes", async (req, res) => {
    const respuesta = await ModelPuntaje.find({});
    res.send(respuesta);
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

        // Inserción y eliminación periódica
        setInterval(async () => {
            try {
                // Inserción
                const nuevoPuntaje = { /* tu objeto de puntaje aquí */ };
                const puntajeInsertado = await ModelPuntaje.create(nuevoPuntaje);
                console.log("Puntaje nuevo agregado: ", puntajeInsertado);

                // Eliminación
                const puntajeEliminado = await ModelPuntaje.findByIdAndDelete(puntajeInsertado._id);
                console.log("Puntaje eliminado: ", puntajeEliminado);
            } catch (error) {
                console.error("Error durante la inserción o eliminación periódica: ", error);
            }
        }, 5 * 60 * 1000); // Cada 5 minutos
    })
    .catch(error => {
        console.log("Error al conectar a la base de datos: ", error.message);
    });
