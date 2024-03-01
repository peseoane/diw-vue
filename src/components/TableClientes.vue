<script>
import Swal from "sweetalert2";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "TablaClientes",
    components: {
        NavBar,
    },
    methods: {
        deleteCliente(index) {
            this.clientes.splice(index, 1);
        },
        cleanForm() {
            document.getElementById("nameForm").value = "";
            document.getElementById("subnameForm").value = "";
            document.getElementById("dniForm").value = "";
            document.getElementById("emailForm").value = "";

            this.mostrarAlerta("Campos eliminados", "info");
        },
        appendCliente() {
            if (
                this.nameForm === undefined ||
                this.subnameForm === undefined ||
                this.dniForm === undefined ||
                this.emailForm === undefined
            ) {
                this.mostrarAlerta("Debe Completar los Campos", "warning");
                return false;
            }

            if (
                this.nameForm.trim() === "" ||
                this.subnameForm.trim() === "" ||
                this.dniForm.trim() === "" ||
                this.emailForm.trim() === ""
            ) {
                this.mostrarAlerta("Debe Completar los Campos", "warning");
                return false;
            }

            this.clientes.push({
                id: this.clientes + 1,
                nombre: this.nameForm,
                apellido: this.subnameForm,
                dni: this.dniForm,
                email: this.emailForm
            });
        },
        mostrarAlerta(mensaje, tipo) {
            Swal.fire({
                title: mensaje,
                icon: tipo,
                customClass: {
                    container: "custom-alert-container",
                    popup: "custom-alert",
                    confirmButton: "custom-alert-button"
                }
            });
        },
        validarDNI() {
            let dniNie = this.dniForm.trim().toUpperCase();
            this.dniForm = dniNie;

            let regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

            if (!regexDniNie.test(dniNie)) {
                this.mostrarAlerta("DNI o NIE no valido", "error");
                document.getElementById("dniForm").value = "";
                return;
            }

            let numero = parseInt(dniNie.slice(0, 8), 10);
            let letraCalculada = "";

            if (dniNie.charAt(0) === "X" || dniNie.charAt(0) === "Y" || dniNie.charAt(0) === "Z") {
                letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numero % 23);
            } else {
                letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numero % 23);
            }

            if (letraCalculada !== dniNie.charAt(8)) {
                this.mostrarAlerta("DNI o NIE no valido", "error");
                document.getElementById("dniForm").value = "";
            }
        },
        modificarCliente(clienteId) {
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            if (cliente) {
                document.getElementById("nameForm").value = cliente.nombre;
                document.getElementById("subnameForm").value = cliente.apellido;
                document.getElementById("emailForm").value = cliente.email;
                document.getElementById("dniForm").value = cliente.dni;
            }
        },
        async eliminarCliente(clienteId) {
            const confirmacion = await this.mostrarConfirmacionEliminar();

            if (confirmacion) {
                const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

                if (index !== -1) {
                    await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                        method: "DELETE"
                    });
                    this.mostrarAlerta("Cliente eliminado correctamente", "success");
                } else {
                    this.mostrarAlerta("Cliente no encontrado", "error");
                }
            }
        },
        async postUsuario(user) {
            try {
                let response = await fetch("http://localhost:3000/clientes/${clienteId", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {"Content-type": "aplication/json; charset=UTF-8"}
                });

                let usuarioCreado = await response.json();
                this.clientes = [...this.clientes, usuarioCreado];
            } catch (error) {
                console.log(error);
            }
        },
        async mostrarConfirmacionEliminar() {
            // Mostrar ventana de confirmación
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro de que deseas eliminar este cliente?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                customClass: {
                    container: "custom-alert-container",
                    popup: "custom-alert",
                    confirmButton: "custom-alert-button",
                    cancelButton: "custom-alert-button"
                }
            });

            return confirmacion.isConfirmed;
        }, // función para guardar o actualizar el cliente
        async guardarCliente() {
            try {
                if (!this.validarDNI()) {
                    // Crear el cliente con los datos del formulario
                    const cliente = {
                        dni: this.dniForm.trim().toUpperCase(),
                        nombre: this.nameForm.trim(),
                        apellido: this.subnameForm.trim(),
                        email: this.emailForm.trim()
                    };

                    let url = "http://localhost:3000/clientes";
                    let metodo = "POST";

                    // Si hay un cliente seleccionado, es una actualización (PUT)
                    if (this.clienteSeleccionado) {
                        url += `/${this.clienteSeleccionado.id}`;
                        metodo = "PUT";
                    }

                    // Realizar la solicitud al servidor JSON
                    const response = await fetch(url, {
                        method: metodo,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cliente)
                    });

                    if (!response.ok) {
                        throw new Error("Error al guardar el cliente en el servidor.");
                    }

                    // Limpiar el formulario y obtener la lista actualizada de clientes
                    this.cleanForm();
                    this.obtenerClientes();

                    // Mostrar mensaje de éxito
                    const mensaje = this.clienteSeleccionado
                        ? "Cliente modificado correctamente."
                        : "Cliente guardado correctamente.";

                    Swal.fire({
                        icon: "success",
                        title: "Éxito",
                        text: mensaje
                    });
                } else {
                    // Mostrar alerta de error de validación
                    this.mostrarAlerta("DNI o NIE no válido", "error");

                    // Mostrar mensaje de error
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Error al guardar el cliente en el servidor."
                    });
                }
            } catch (error) {
                console.error("Error al guardar el cliente:", error);
            }
        },
        async obtenerClientes() {
            try {
                let response = await fetch("http://localhost:3000/clientes");

                this.clientes = await response.json();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se puedieron cargar los datos"
                });
            }
        }
    },
    mounted() {
        this.obtenerClientes();
        this.$refs.nombre.focus();
    },
    data() {
        return {
            clientes: []
        };
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
                        <input v-model="nameForm" ref="nombre" type="text" class="form-control" id="nameForm" />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">Apellidos: </span>
                        </div>
                        <input v-model="subnameForm" type="text" class="form-control" id="subnameForm" />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">DNI: </span>
                        </div>
                        <input v-model="dniForm" type="text" class="form-control" id="dniForm" @blur="validarDNI" />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">Email: </span>
                        </div>
                        <input v-model="emailForm" type="text" class="form-control" id="emailForm" />
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center gap-4 mt-2">
                    <button @click="guardarCliente()" class="btn btn-primary">Guardar</button>
                    <button @click="cleanForm()" class="btn btn-secondary">Limpiar</button>
                </div>
            </div>
            <hr />
        </div>

        <table class="table table-striped">
            <thead class="table-primary">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>e-email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.dni }}</td>
                    <td>{{ cliente.email }}</td>
                    <td class="d-flex gap-4 justify-content-center">
                        <button class="btn btn-danger" @click="eliminarCliente(cliente.id)">
                            <IconTrash></IconTrash>
                        </button>
                        <button class="btn btn-warning" @click="modificarCliente(cliente.id)">
                            <IconPencil></IconPencil>
                        </button>
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