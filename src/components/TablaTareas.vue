<script>
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {format} from "date-fns";

export default {
    name: "TablaClientes",
    components: {
        NavBar
    },
    data() {
        return {
            nombre: """
            descripcion: """
            fecha: """
            equipos: [],
            prioridad: ""alta"
            tareas: [],
            observaciones: """
            archivo: null,
            show: false
        };;
    },
    created() {
        this.obtenerTareas();
    },
    mounted() {
        const fechaAlta = this.$refs.fechaAlta;
        flatpickr(fechaAlta, {});
    },
    methods: {
        cargarTarea(tarea) {
            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.fecha = tarea.fecha;
            this.sala = tarea.sala;
            this.equipos = tarea.equipos;
            this.prioridad = tarea.prioridad;
            this.observaciones = tarea.observaciones;
            this.tareaSeleccionada = tarea;
        },
        abrirCalendario() {
            const fechaAlta = this.$refs.fechaAlta;
            if (fechaAlta._flatpickr) {
                fechaAlta._flatpickr.open();
            }
        },
        limpiarCampos() {
            this.nombre = "";
            this.descripcion = "";
            this.fecha = "";
            this.prioridad = "alta";
            this.tareaSeleccionada = "";
            this.equipos = [];
            this.observaciones = "";
            this.sala = null;
            this.archivo = null;
            this.$refs.fileInput.value = null;
        },
        limpiarTarea() {
            this.nombre = "";
            this.descripcion = "";
            this.fecha = "";
            this.prioridad = "alta";
            this.equipos = [];
            this.observaciones = "";
            this.sala = null;
            this.$refs.fileInput.value = null;
        },
        handleFileChange(event) {
            this.archivo = event.target.files[0];
        },
        mostrarObservaciones(observaciones) {
            if (observaciones === "" || observaciones === null) {
                Swal.fire({
                    icon: "info",
                    title: "Observaciones",
                    text: "No hay observaciones"
                });
                return true;
            }
            Swal.fire({
                icon: "info",
                title: "Observaciones",
                text: observaciones
            });
        },
        async obtenerTareas() {
            try {
                const res = await fetch("http://localhost:5000/tareas");
                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                }

                this.tareas = await res.json();
                console.log(this.tareas);
            } catch (error) {
                console.log(error);
            }
        },
        async eliminarTarea(id) {
            try {
                console.log("http://localhost:5000/tareas/", id);
                const res = await fetch(`http://localhost:5000/tareas/${id}`, {
                    method: "DELETE"
                });

                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                }

                await Swal.fire({
                    icon: "success",
                    title: "Tarea eliminada",
                    text: "La tarea se ha eliminado correctamente."
                });

                await this.obtenerTareas();
            } catch (error) {
                console.error(error);

                await Swal.fire({
                    icon: "error",
                    title: "Tarea elimina.",
                    text: "La tarea se ha eliminado correctamente."
                });
            }
        },
        async guardarTarea() {
            try {
                const nuevaTarea = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    fecha: format(new Date(this.fecha), "dd-MM-yyyy"),
                    sala: this.sala,
                    equipos: this.equipos,
                    prioridad: this.prioridad,
                    observaciones: this.observaciones
                };
                const formData = new FormData();
                formData.append("nombre", this.nombre);
                formData.append("descripcion", this.descripcion);
                formData.append("fecha", this.fecha);
                formData.append("sala", this.sala);
                this.equipos.forEach(equipo => {
                    formData.append("equipos", equipo);
                });
                formData.append("prioridad", this.prioridad);
                formData.append("observaciones", this.observaciones);
                formData.append("archivo", this.archivo);
                console.log(formData);

                if (["alta", "media", "baja"].includes(nuevaTarea.prioridad)) {
                    const res = await fetch("http://localhost:5000/tareas", {
                        method: "POST",
                        // headers: {
                        //   'Content-Type': 'application/json'
                        // },
                        // body: JSON.stringify(nuevaTarea)
                        body: formData
                    });

                    await Swal.fire({
                        icon: "success",
                        title: "Tarea Guardada",
                        text: "La tarea se ha guardado correctamente"
                    });

                    if (!res.ok) {
                        const message = `An error has occured: ${res.status}`;
                        throw new Error(message);
                    }
                    await this.obtenerTareas();
                }
                this.limpiarTarea();
            } catch (error) {
                console.error(error);
            }
        },
        async modificarTarea() {
            try {
                // Obtener la tarea seleccionada
                const tarea = this.tareaSeleccionada;

                // Actualizar los campos de la tarea seleccionada con los nuevos valores del formulario
                tarea.nombre = this.nombre;
                tarea.descripcion = this.descripcion;
                tarea.fecha = this.fecha;
                tarea.sala = this.sala;
                tarea.equipos = this.equipos;
                tarea.prioridad = this.prioridad;
                tarea.observaciones = this.observaciones;

                // Enviar la solicitud PUT con la tarea actualizada al servidor
                const res = await fetch(`http://localhost:5000/tareas/${tarea._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tarea)
                });

                if (!res.ok) {
                    throw new Error(`An error has occurred: ${res.status}`);
                }

                // Actualizar la lista de tareas después de modificar la tarea
                await this.obtenerTareas();

                // Limpiar los campos del formulario después de modificar la tarea
                this.limpiarCampos();

                // Mostrar mensaje de éxito
                await Swal.fire({
                    icon: "success",
                    title: "Tarea modificada",
                    text: "La tarea se ha modificado correctamente."
                });

                // Limpiar la tarea seleccionada después de la modificación
                this.tareaSeleccionada = null;
            } catch (error) {
                console.error(error);
                // Mostrar mensaje de error
                await Swal.fire({
                    icon: "error",
                    title: "Error al modificar la tarea",
                    text: "Ha ocurrido un error al intentar modificar la tarea. Por favor, inténtalo de nuevo."
                });
            }
        }
    }
};
</script>

<template>
    <div>
        <NavBar></NavBar>
    </div>

    <div id="tabla-clientes" class="w-75 mt-4 d-flex flex-column align-items-center container">
        <h3>Gestion Tareas</h3>
        <hr />

        <div class="w-75 d-flex justify-content-center align-items-center flex-column gap-4">
            <div class="w-75" id="form">
                <div class="d-flex justify-content-center align-items-center flex-column gap-4 input-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">Nombre: </span>
                        </div>
                        <input
                            v-model="nombre"
                            ref="nombre"
                            type="text"
                            class="form-control"
                            id="nombre"
                            name="nombre"
                        />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">Descripcion: </span>
                        </div>
                        <input
                            v-model="descripcion"
                            type="text"
                            class="form-control"
                            id="descripcion"
                            name="descripcion"
                        />
                    </div>

                    <div class="input-group">
                        <span class="input-group-text custom-span">Fecha:</span>
                        <input
                            ref="fechaAlta"
                            v-model="fecha"
                            class="form-control"
                            placeholder="Seleccionar Fecha "
                            type="text"
                        />
                        <button class="btn btn-outline-secondary" type="button" @click="abrirCalendario">
                            <i class="bi bi-calendar"></i>
                        </button>
                    </div>

                    <div class="input-group">
                        <label class="custom-span input-group-text" for="salaSelect">Sala:</label>
                        <select id="salaSelect" v-model="sala" class="form-select">
                            <option disabled selected value="">Sala de Reunion</option>
                            <option value="Sala 1">Sala 1</option>
                            <option value="Sala 2">Sala 2</option>
                            <option value="Sala 3">Sala 3</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <span class="input-group-text custom-span">Equipamiento:</span>
                        <div class="form-check form-check-inline">
                            <input
                                id="equipoVideoconferencia"
                                v-model="equipos"
                                class="form-check-input"
                                type="checkbox"
                                value="Equipo Videoconferencia"
                            />
                            <label class="form-check-label" for="equipoVideoconferencia">Equipo Videoconferencia</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                id="televisor"
                                v-model="equipos"
                                class="form-check-input"
                                type="checkbox"
                                value="Televisor"
                            />
                            <label class="form-check-label" for="televisor">Televisor</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                id="pizzarraDigital"
                                v-model="equipos"
                                type="checkbox"
                                value="Pizarra Digital"
                            />
                            <label class="form-check-label" for="pizzarraDigital">Pizarra Digital</label>
                        </div>
                    </div>

                    <div class="input-group">
                        <span class="input-group-text custom-span">Prioridad:</span>
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-light">
                                <input
                                    id="prioridadAlta"
                                    v-model="prioridad"
                                    autocomplete="off"
                                    type="radio"
                                    value="alta"
                                />
                                Alta
                            </label>
                            <label class="btn btn-light">
                                <input
                                    id="prioridadMedia"
                                    v-model="prioridad"
                                    autocomplete="off"
                                    type="radio"
                                    value="media"
                                />
                                Media
                            </label>
                            <label class="btn btn-light">
                                <input
                                    id="prioridadBaja"
                                    v-model="prioridad"
                                    autocomplete="off"
                                    type="radio"
                                    value="baja"
                                />
                                Baja
                            </label>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Observaciones:</span>
                        <textarea
                            id="descripcion"
                            v-model="observaciones"
                            class="form-control"
                            maxlength="256"
                            name="descripcion"
                            placeholder="Descripccion Tarea (max 256 caracteres)"
                        ></textarea>
                    </div>
                </div>

                <div class="custom-file">
                    <div class="input-group mt-3">
                        <input
                            id="archivo"
                            ref="fileInput"
                            accept=".pdf, .jpg, .jpeg"
                            class="custom-file-input form-control"
                            name="archivo"
                            placeholder="Seleccione un archivo"
                            type="file"
                            @change="handleFileChange"
                        />
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center gap-4 mt-2">
                    <button @click="guardarTarea" class="btn btn-primary">Guardar</button>
                    <button @click="modificarTarea" class="btn btn-secondary">Modificar</button>
                    <button @click="limpiarCampos" class="btn btn-light">Limpiar</button>
                </div>
            </div>
            <hr />
        </div>

        <table class="table table-striped">
            <thead class="table-primary">
                <tr class="primary-set">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Fecha Alta</th>
                    <th>Sala Reuniones</th>
                    <th>Equipamiento</th>
                    <th>Prioridad</th>
                    <th>Gestion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tarea in tareas" :key="tarea._id">
                    <td class="text-center">{{ tarea._id }}</td>
                    <td>{{ tarea.nombre }}</td>
                    <td>{{ tarea.descripcion }}</td>
                    <td class="text-center">{{ tarea.fecha }}</td>
                    <td class="text-center">{{ tarea.sala }}</td>
                    <td class="text">{{ tarea.equipos.join(", ") }}</td>
                    <td class="text-center">{{ tarea.prioridad }}</td>
                    <td class="text-center">
                        <div>
                            <button class="btn btn-warning m-2" @click="cargarTarea(tarea)">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-info m-2" @click="mostrarObservaciones(tarea.observaciones)">
                                <i class="bi bi-eye"></i>
                            </button>
                            <button class="btn btn-danger m-2" @click="eliminarTarea(tarea._id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.btn-prevent :hover {
    background-color: aliceblue;
}
</style>