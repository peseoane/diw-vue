import mongoose from "mongoose";
const {Schema} = mongoose;

const tareaSchema = new Schema({
    nombre: String,
    descripcion: String,
    fecha: String,
    prioridad: String
});

export default mongoose.model("tarea", tareaSchema);
