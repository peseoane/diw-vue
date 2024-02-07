import express from "express";
import http from "http";
import morgan from "morgan";
import tareasRouter from "./router/tareas.mjs";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);

app.use("/tareas", tareasRouter);
app.use(morgan("dev"));
app.use(express.json());

app.set("port", process.env.PORT || 5000);

app.get("/", (req, res) => {
    res.send("Holaa");
});

server.listen(app.get("port"), () => {
    console.log("Servidor corriendo en el puerto: ", app.get("port"));
});

mongoose
    .connect("mongodb://localhost:27017/diw-vue")
    .then(db => console.log("Conectado a la base de datos"))
    .catch(error => "Error al conectar a la base de datos");
