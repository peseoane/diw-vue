<script>
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";
export default {
    name: "TablaClientes",
    components: {
        NavBar
    },

    data() {
        return {
            clientes: [],
            clienteSeleccionado: null,
            dni: "",
            nombre: "",
            apellido: "",
            email: ""
        };
    },
    mounted() {
        this.obtenerClientes(); // Llama a la función para obtener clientes cuando el componente se monta
    },

    methods: {
        // función para guardaro actualizar el cliente

        async guardarCliente() {
            try {
                const validacionDniNie = this.validarDniNie(); // Validar DNI/NIE

                if (validacionDniNie) {
                    // Crear el cliente con los datos del formulario
                    const cliente = {
                        dni: this.dni.trim().toUpperCase(),
                        nombre: this.nombre.trim(),
                        apellido: this.apellido.trim(),
                        email: this.email.trim()
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
                    this.limpiar();

                    // Mostrar mensaje de éxito
                    const mensaje = this.clienteSeleccionado
                        ? "Cliente modificado correctamente."
                        : "Cliente guardado correctamente.";

                    // Mostrar SweetAlert2 y ejecutar obtenerClientes() después de cerrar la ventana
                    Swal.fire({
                        icon: "success",
                        title: "Éxito",
                        text: mensaje,
                        showConfirmButton: true,
                        confirmButtonText: "Cerrar"
                    }).then(() => {
                        this.obtenerClientes(); // Actualizar la lista de clientes
                    });
                } else {
                    // Mostrar alerta de error de validación
                    this.mostrarAlerta("DNI o NIE no válido", "error");
                }
            } catch (error) {
                console.error("Error al guardar el cliente:", error);

                // Mostrar mensaje de error
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al guardar el cliente en el servidor."
                });
            }
        },

        // Validar DNI o NIE
        validarDniNie() {
            if (this.dni.length !== 0) {
                const dniNie = this.dni.trim().toUpperCase(); // Convierte a mayúsculas para simplificar la validación

                // Expresión regular para validar DNI y NIE
                const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

                if (!regexDniNie.test(dniNie)) {
                    this.mostrarAlerta("DNI o NIE no válido", "error");
                    return false;
                }

                // Validar el dígito de control
                const valor = dniNie.replace(/^[XYZ]/, letra => {
                    return letra === "X" ? "0" : letra === "Y" ? "1" : letra === "Z" ? "2" : letra;
                });

                const numero = parseInt(valor.slice(0, 9), 10);
                let letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numero % 23);

                if (letraCalculada !== dniNie.charAt(8)) {
                    this.mostrarAlerta("DNI o NIE no válido", "error");
                    return false;
                }
                // Devolver true si la validación es exitosa
                return true;
            }
        },

        // función para modificar el cliente que llama a la función limpiar y guardarCliente
        modificarCliente(clienteId) {
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            if (cliente) {
                this.clienteSeleccionado = cliente; // Asegúrate de actualizar clienteSeleccionado
                this.dni = cliente.dni;
                this.nombre = cliente.nombre;
                this.apellido = cliente.apellido;
                this.email = cliente.email;

                this.mostrarAlerta("Datos del cliente listos para modificar", "info");
            } else {
                this.mostrarAlerta("Cliente no encontrado", "error");
            }
        },

        async obtenerClientes() {
            try {
                // Ahora hacemos una solicitud directamente al servidor JSON

                const response = await fetch("http://localhost:3000/clientes"); // Cambia el puerto si es diferente

                if (!response.ok) {
                    throw new Error("No se pudieron obtener los datos del servidor.");
                }

                this.clientes = await response.json();
            } catch (error) {
                console.error("Error al obtener los clientes:", error);
                // Puedes agregar manejo de errores aquí, por ejemplo, mostrar un mensaje al usuario
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron obtener los datos del servidor."
                });
            }
        },

        // función para eliminar el cliente

        async eliminarCliente(clienteId) {
            // Mostrar ventana de confirmación
            const confirmacion = await this.mostrarConfirmacionEliminar();

            // Verificar si se confirmó la eliminación
            if (confirmacion) {
                // Realizar la lógica de eliminación
                const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

                if (index !== -1) {
                    //this.clientes.splice(index, 1);
                    await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                        method: "DELETE"
                    });
                    // Mostrar alerta de éxito
                    this.mostrarAlerta("Cliente eliminado correctamente", "success");
                } else {
                    // Mostrar alerta de error si el cliente no existe
                    this.mostrarAlerta("Cliente no encontrado", "error");
                }
            }
        },

        // función  Limpiar campos del formulario
        limpiar() {
            // Lógica para limpiar los campos del formulario
            this.nombre = "";
            this.apellido = "";
            this.dni = "";
            this.email = "";

            this.mostrarAlerta("Campos limpiados", "info");
            return;
        },

        // Mostrar ventana alerta
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

        // Mostrar ventana de confirmación

        async mostrarConfirmacionEliminar() {
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
        }
    }
};
</script>

<template>
    <div>
        <NavBar />
    </div>
    <br />
    <div class="row justify-content-center mt-4">
        <h3 class="text-center font-weight-bold">Gestión Clientes</h3>
    </div>
    <hr />
    <!-- formulario -->
    <div class="container-fluid">
        <div class="row justify-content-center align-items-center" id="map_section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3 w-25">
                        <span class="input-group-text custom-span">DNI/NIE:</span>
                        <input
                            v-model="dni"
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="DNI Cliente"
                            id="dni"
                            name="dni"
                            @blur="validarDniNie"
                        />
                    </div>
                    <div class="input-group mb-3 w-75">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input
                            ref="nombre"
                            v-model="nombre"
                            type="text"
                            class="form-control"
                            placeholder="Nombre Cliente"
                            id="nombre"
                            name="nombre"
                        />
                    </div>
                    <div class="input-group mb-3 w-75">
                        <span class="input-group-text custom-span">Apellidos:</span>
                        <input
                            v-model="apellido"
                            type="text"
                            placeholder="Apellidos Cliente"
                            class="form-control"
                            id="apellido"
                            name="apellido"
                        />
                    </div>

                    <div class="input-group mb-3 w-50">
                        <span class="input-group-text custom-span">Email:</span>
                        <input
                            v-model="email"
                            type="text"
                            class="form-control"
                            placeholder="e-mail cliente"
                            id="email"
                            name="email"
                        />
                    </div>
                    <!-- Botones -->
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardarCliente">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiar">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- tabla de datos el resto sería igual que antesa -->
    <hr />
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold">Listado Clientes</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead class="table-primary">
                        <tr>
                            <th>DNI</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" :key="cliente.id">
                            <td class="text-center">{{ cliente.dni }}</td>
                            <td>{{ cliente.apellido }}</td>
                            <td>{{ cliente.nombre }}</td>
                            <td class="text-center">{{ cliente.email }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="modificarCliente(cliente.id)">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-danger m-2" @click="eliminarCliente(cliente.id)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
