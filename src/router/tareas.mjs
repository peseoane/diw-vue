import express from "express";
const rutas = express.Router();
import tarea from "../models/tarea.mjs";
import multer from "multer";

// Importante, sin este campo no reconoce
rutas.use(express.json());

// Multer rutas
const upload = multer({dest: "uploads/"});

rutas.post("/", upload.single("archivo"), async (req, res) => {
    try {
        if (req.file) {
            const nuevatarea = new tarea(req.body);
            await nuevatarea.save();
            res.json({
                status: "Tarea guardada"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al guardar la tarea"
        });
    }
});


rutas.get("/", async (req, res) => {
    const tareas = await tarea.find();
    res.json(tareas);
})

// rutas.post('/', async (req,res) =>{
//     new Tarea();
//     console.log(new Tarea());
// })


// Peticion para actualizar una tarea
rutas.put("/:id", async (req, res) => {
    try {
        const tareaId = req.params.id;

        const tareaExistente = await tarea.findById(tareaId);
        if (!tareaExistente) {
            return res.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        tareaExistente.set(req.body);
        await tareaExistente.save();

        console.log(tareaExistente);

        res.json({
            status: "Tarea actualizada"
        });
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        res.status(500).json({
            error: "Error al actualizar la tarea"
        });
    }
});


// Peticion para subir tarea
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

rutas.delete("/:id", async (req, res) => {
    try {
        await tarea.findByIdAndDelete(req.params.id);
        res.json({
            status: "Tarea eliminada"
        });
    } catch (error) {
        console.log("Error al eliminar la tarea:", error);
        res.status(500).json({
            error: "Error al eliminar"
        });
    }
});


export default rutas;