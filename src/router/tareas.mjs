import express from "express";
const rutas = express.Router();
import tarea from "../models/tarea.mjs";

// Importante, sin este campo no reconoce
rutas.use(express.json());

rutas.get("/", async (req, res) => {
    const tareas = await tarea.find();
    res.json(tareas);
});

// rutas.post('/', async (req,res) =>{
//     new Tarea();
//     console.log(new Tarea());
// })

rutas.post("/", async (req, res) => {
    try {
        const nuevatarea = new tarea(req.body);
        console.log(req.body);
        await nuevatarea.save();
        console.log(nuevatarea);
        res.json({
            status: "Tarea guardada"
        });
    } catch (error) {
        console.error("Error al guardar la tarea:", error);
        res.status(500).json({
            error: "Error al guardar la tarea"
        });
    }
});

export default rutas;
