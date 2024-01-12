<template>
  <div class="hello tareas">
    <h2>{{ mensajeL }}</h2>
    <div class="lista">
      <input v-model="tarea.nombre" type="text" placeholder="Añadir tarea" />
      <button @click="agregarTarea">Añadir</button>
      <h5>Tareas:</h5>
      <h5>Total de tareas: {{ tareas.length }}</h5>
      <ul>
        <li v-for="(tarea, id) in tareas" :key="id">
          {{ id + 1 }} . {{ tarea.nombre }} - Completada:
          {{ tarea.completada ? "Sí" : "No" }} - Fecha: {{ tarea.fecha }}
          <input
            type="checkbox"
            v-model="tarea.completada"
            @change="completarTarea(id)"
          />
          <button @click="eliminarTarea(id)">Eliminar</button>
        </li>
      </ul>
    </div>
    <h5 class="completadas">
      Tareas completadas:
      <ul>
        <li
          v-for="(tarea, id) in tareasCompletadas"
          :key="id"
          class="completada"
        >
          {{ id + 1 }} . {{ tarea.nombre }} - Fecha: {{ tarea.fecha }}
        </li>
      </ul>
    </h5>
  </div>
</template>

<script>
export default {
  name: "ListaTarea",
  props: {
    mensajeL: String,
  },
  methods: {
    guardarTareasEnLocalStorage() {
      localStorage.setItem("tareas-vue", JSON.stringify(this.tareas));
    },
    cargarTareasDesdeLocalStorage() {
      const tareas = JSON.parse(localStorage.getItem("tareas-vue"));
      if (tareas === null) {
        this.tareas = [];
      } else {
        this.tareas = tareas;
      }
    },
    agregarTarea() {
      this.guardarTareasEnLocalStorage();
      this.tareas.push({
        nombre: this.tarea.nombre,
        completada: false,
        fecha: new Date().toLocaleDateString(),
      });
      this.tarea.nombre = "";
    },
    eliminarTarea(id) {
      this.tareas.splice(id, 1);
    },
    completarTarea(id) {
      const tarea = this.tareas[id];
      const tareaActualizada = { ...tarea, completada: !tarea.completada };
      this.$set(this.tareas, id, tareaActualizada);
    },
  },
  computed: {
    tareasCompletadas() {
      return this.tareas.filter((tarea) => tarea.completada);
    },
  },
  data() {
    return {
      tarea: {
        nombre: "",
        fecha: "",
      },
      tareas: [],
    };
  },
  mounted() {
    this.cargarTareasDesdeLocalStorage();
  },
};
</script>

<style>
.tareas {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  width: 300px;
  display: inline-block;
}

.completada {
  color: red;
}

.lista {
}
</style>