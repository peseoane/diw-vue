<template>
    <div class="container">
        <h2 class="text-center p-4">Gestión de clientes</h2>
        <div class="row g-3">
            <div class="">
                <label for="inputNombre" class="form-label">Nombre</label>
                <input v-model="nombre" type="text" class="form-control" id="inputNombre" />
            </div>
            <div class="">
                <label for="inputApellido" class="form-label">Apellido</label>
                <input v-model="apellido" type="text" class="form-control" id="inputApellido" />
            </div>
            <div class="">
                <label for="inputDni" class="form-label">DNI</label>
                <input v-model="dni" type="text" class="form-control" id="inputDni" />
            </div>
            <div class="">
                <label for="inputEmail" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="inputEmail" />
            </div>
            <div class="col-12 text-center">
                <button type="submit" @click="guardar()" class="btn btn-primary">Guardar</button>
                <button type="submit" class="btn btn-secondary">Cancelar</button>
            </div>
        </div>
    </div>

    <div id="tabla-clientes" class="container grid p-4">
        <h3 class="text-center p-4 border-top border-black">Lista de clientes</h3>
        <table class="table border-black justify-content-center">
            <thead>
                <tr class="text-center fw-bolder">
                    <th class="">Nombre</th>
                    <th>Apellido</th>
                    <th class="font-monospace bg-danger text-white fw-bolder">DNI</th>
                    <th>email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center align-middle" v-for="(cliente, id) in clientes" :key="id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td class="font-monospace bg-danger-subtle fw-bolder">
                        {{ cliente.dni }}
                    </td>
                    <td>{{ cliente.email }}</td>
                    <td class="">
                        <button class="btn btn-danger me-2 bi bi-pencil"></button>
                        <button class="btn btn-warning bi bi-trash" @click="eliminarCliente(cliente.id)"></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
    name: "TableClientes",
    data() {
        return {
            nombre: "",
            apellido: "",
            dni: "",
            email: "",
            clientes: [
                {
                    nombre: "Juan",
                    apellido: "Perez",
                    dni: "12345678",
                    email: "juan.perez@hotmail.com"
                },
                {
                    nombre: "Maria",
                    apellido: "Gomez",
                    dni: "87654321",
                    email: "maria.gomez@gmail.com"
                }
            ]
        };
    },
    methods: {
        mostrarAlerta(mensaje, tipo) {
            Swal.fire({
                title: mensaje,
                icon: tipo,
                customClass: {
                    container: "custom-alert-container",
                    popup: "custom-alert-popup",
                    confirmButton: "custom-alert-button"
                }
            });
        },
        limpiar() {
            this.nombre = "";
            this.apellido = "";
            this.dni = "";
            this.email = "";
            this.mostrarAlerta("Cliente agregado correctamente", "success");
        },
        validarDniNie(dni) {
            const dniNie = this.dni.trim().toUpperCase();
            this.dni = dniNie;
            const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

            if (!regexDniNie.test(dniNie)) {
                this.mostrarAlerta("DNI/NIE inválido", "error");
                this.dni = "";
                return false;
            }

            const numeroControl = parseInt(dniNie.slice(0, 8), 10);
            let letraCalculada = "";

            if (dniNie.charAt(0) === "X" || dniNie.charAt(0) === "Y" || dniNie.charAt(0) === "Z") {
                letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numeroControl % 23);
            } else {
                letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numeroControl % 23);
            }

            if (letraCalculada !== dniNie.charAt(8)) {
                this.mostrarAlerta("DNI/NIE inválido", "error");
                this.dni = "";
                return false;
            }
        },
        guardar() {
            // Sanitizar datos
            if (
                this.nombre.trim() === "" ||
                this.apellido.trim() === "" ||
                this.dni.trim() === "" ||
                this.email.trim() === ""
            ) {
                this.mostrarAlerta("Todos los campos son obligatorios", "error");
            } else {
                const nuevoCliente = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    dni: this.dni,
                    email: this.email
                };
                this.clientes.push(nuevoCliente);
                this.mostrarAlerta("Cliente agregado correctamente", "success");
                this.nombre = nuevoCliente.nombre;
                this.apellido = nuevoCliente.apellido;
                this.dni = nuevoCliente.dni;
                this.email = nuevoCliente.email;
                this.$emit("agregarCliente", nuevoCliente);
                this.limpiar();
            }
        },
        eliminarCliente(id) {
            const index = this.clientes.findIndex(cliente => cliente.id === id);

            if (index !== -1) {
                this.clientes.splice(index, 1);
                this.mostrarAlerta("Cliente eliminado correctamente", "alert-success");
            } else {
                this.mostrarAlerta("Cliente no encontrado", "alert-danger");
            }
        }
    }
};
</script>

<style scoped></style>
