<script>
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";

export default {
  name: "TablaClientes",
  components: {
    NavBar,
  },
  data() {
    return {
      nombre: "",
      descripcion: "",
      fecha: "",
      prioridad: "alta",
      tareas: [],
      prioridades: ["alta", "media", "baja"]
    };
  },

  created() {
    this.obtenerTareas();
  },

  methods: {
    limpiarCampos() {
      this.nombre = "";
      this.descripcion = "";
      this.fecha = "";
      this.prioridad = "alta";
    },
    async guardarTarea() {
      try {
        const nuevaTarea = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          fecha: this.fecha,
          prioridad: this.prioridad
        };
        if (
          ["alta",
           "media",
           "baja"].includes(nuevaTarea.prioridad)) {
          const res = await fetch("http://localhost:5000/tareas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
          });

          await Swal.fire({
            icon: "success",
            title: "Tarea guardada",
            showConfirmButton: false,
            timer: 1500
          });

          if (!res.ok) {
            const msg = `Error al guardar la tarea: ${res.statusText}`;
            throw new Error(msg);
          }

          await this.obtenerTareas();
          this.limpiarCampos();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message
        });
      }
    },
  async obtenerTareas() {
    try {
      const res = await fetch("http://localhost:5000/tareas");
      if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
      }

      this.tareas = await res.json();
      console.log(this.tareas);
    } catch (error) {
      console.log(error);
    }
  }
  }
};
</script>

<template>
    <div>
        <NavBar></NavBar>
    </div>

    <div id="tabla-clientes" class="w-75 d-flex flex-column align-items-center container">
        <h3>Gestion Clientes</h3>
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
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">Fecha: </span>
                        </div>
                        <input v-model="fecha" type="text" class="form-control" id="fecha" name="fecha" />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Prioridad: </span>
                        </div>
                        <div v-for="p in prioridades" :key="p" class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                v-model="prioridad"
                                :value="p"
                                :id="`prioridad-${p}`"
                            />
                            <label class="form-check-label" :for="`prioridad-${p}`">{{ p }}</label>
                        </div>
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
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Fecha Alta</th>
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
                    <td class="text-center">{{ tarea.prioridad }}</td>
                    <td class="text-center">
                        <div>
                            <button class="btn btn-warning m-2" @click="modificarTarea(tarea.id)">
                                <IconPencil></IconPencil>
                            </button>
                            <button class="btn btn-danger m-2" @click="eliminarTarea(tarea.id)">
                                <IconTrash></IconTrash>
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