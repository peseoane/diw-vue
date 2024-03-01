<template>
    <div class="mt-4">
        <h3>Lista de tareas:</h3>

        <div class="d-flex gap-4 mt-4 justify-content-center align-items-center">
            <input v-model="tareaDefault" id="tareaInput" class="rounded" type="text" placeholder="Nueva Tarea" />
            <div class="d-flex flex-column gap-2">
                <button @click="agregarTarea" class="btn btn-primary">Agregar</button>
                <button @click="eliminarTareas" class="btn btn-danger">Borra Todos</button>
                <div>Total tareas: {{ listaTareas.length }}</div>
            </div>
        </div>

        <div class="mt-4 flex-column justify-content-center align-items-center d-flex gap-2">
            <div
                v-for="(tarea, index) in listaTareas"
                :key="tarea.id"
                class="d-flex justify-content-center align-items-center gap-2"
            >
                <div>{{ index + 1 }} - {{ tarea.text }} - {{ tarea.date }}</div>
                <button class="btn btn-danger" style="width: auto" @click="eliminarTarea(index)">Delete</button>
                <input type="checkbox" @change="agregarTareaCompletada(index)" />
            </div>

            <h3 class="mt-4">Tareas hechas:</h3>
            <div
                v-for="(tarea, index) in listaTareasCompletadas"
                :key="tarea.id"
                class="d-flex justify-content-center align-items-center gap-2"
            >
                <div class="red-text">{{ index + 1 }} - {{ tarea.newDate }} ✔</div>
            </div>
        </div>

        <button @click="fetchData()">Fetch</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ListaTareas",
    methods: {
        agregarTarea() {
            this.listaTareas.push({text: this.tareaDefault, date: new Date().toLocaleString(), completada: false});
        },
        eliminarTareas() {
            this.listaTareas = [];
        },
        eliminarTarea(index) {
            this.listaTareas.splice(index, 1);
        },
        agregarTareaCompletada(index) {
            let currentTarea = this.listaTareas[index];

            if (!this.listaTareasCompletadas.includes(currentTarea)) {
                currentTarea.newDate = new Date().toLocaleString();
                currentTarea.completada = true;

                this.listaTareasCompletadas.push(currentTarea);
            }
            //this.eliminarTarea(index);
        },
        fetchData() {
            // Realizar una solicitud GET a una URL de ejemplo
            axios
                .get("http://localhost:8000/api/sessiontest.php")
                .then(response => {
                    this.data = response.data;
                    console.log(this.data);
                })
                .catch(error => {
                    // Manejar errores
                    console.error("Error al realizar la solicitud:", error);
                });
        }
    },
    data() {
        return {
            listaTareas: [],
            listaTareasCompletadas: []
        };
    },
    mounted() {}
};
</script>

<style scoped>
.red-text {
    color: red;
}
</style>