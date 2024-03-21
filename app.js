const express = require("express")
const cors = require("cors")
const dbConnect = require("./config")
const ModelAlumno = require("./alumnosSchema")
const app = express()

//const port = 3001
const port = process.env.PORT || 4000
const router = express.Router()


router.get("/", async (req, res)=>{
    res.send("Hola Mundo")
})

//CRUD

//CREATE
router.post("/nuevoAlumno", async (req, res)=>{
    const body = req.body
    const respuesta = await ModelAlumno.create(body)
    console.log("alumno nuevo agregado: ", respuesta)
    res.send(respuesta)
})

//READ - one
router.get("/getAlumno/:id", async (req, res)=>{
    const id = req.params.id
    const respuesta = await ModelAlumno.findById(id)
    res.send(respuesta)
})

//READ - all
router.get("/getAllAlumnos", async (req, res)=>{
    const respuesta = await ModelAlumno.find({})
    res.send(respuesta)
})

//UPDATE
router.put("/updateAlumno/:id", async (req, res)=>{
    const body = req.body
    const id = req.params.id
    const respuesta = await ModelAlumno.findByIdAndUpdate({_id: id}, body)
    res.send(respuesta)
})

//DELETE
router.delete("/deleteAlumno/:id", async (req,res)=>{
    const id = req.params.id
    const respuesta = await ModelAlumno.findByIdAndDelete({_id: id})
    res.send(respuesta)
})


//habilitar CORS para todas las solicitudes
app.use(cors())

//parseo de las solicitudes
app.use(express.json())

//usa el router
app.use(router)

//conexion a la base de datos usando el archivo de configuracion config.js
dbConnect()
.then(()=>{
    app.listen(port, ()=>{
        console.log("Escuchando en el puerto:", port)
    })
})
.catch(error => {
    console.log("error al conectar a la base de datos: ", error.message)
})
