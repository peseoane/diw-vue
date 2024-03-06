<script>
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";
import FooterPedro from "@/components/FooterPedro.vue";

export default {
    name: "TablaClientes",
    components: {
        FooterPedro,
        NavBar
    },

    data() {
        return {
            clientes: [],
            personas: [],
            clienteSeleccionado: null,
            dni: "",
            nombre: "",
            apellido: "",
            email: "",
            personaSeleccionada: null,
            dniPersona: "",
            nombrePersona: "",
            apellidoPersona: "",
            emailPersona: ""
        };
    },
    mounted() {
        this.obtenerClientes();
        this.obtenerPersonas();
    },

    methods: {
        async guardarCliente() {
            try {
                const validationDniNine = this.validarDniNie();

                if (validationDniNine) {
                    const cliente = {
                        dni: this.dni.trim().toUpperCase(),
                        nombre: this.nombre.trim(),
                        apellido: this.apellido.trim(),
                        email: this.email.trim()
                    };

                    let url = "http://localhost:3000/clientes";
                    let metodo = "POST";

                    if (this.clienteSeleccionado) {
                        url += `/${this.clienteSeleccionado.id}`;
                        metodo = "PUT";
                    }

                    const response = await fetch(url, {
                        method: metodo,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cliente)
                    });

                    if (!response.ok) {
                        this.mostrarAlerta("DNI o NIE no válido", "error");
                    } else {
                        this.inicializarDatosFormulario();

                        const mensaje = this.clienteSeleccionado
                            ? "Cliente modificado correctamente."
                            : "Cliente guardado correctamente.";

                        Swal.fire({
                            icon: "success",
                            title: "Éxito",
                            text: mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(() => {
                            this.obtenerClientes();
                        });
                    }
                }
            } catch (error) {
                console.error("Error al guardar el cliente:", error);
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al guardar el cliente en el servidor."
                });
            }
        },
        async guardarPersona() {
            try {
                const validationDniNine = this.validarDniNie();

                if (validationDniNine) {
                    const persona = {
                        dni: this.dni.trim().toUpperCase(),
                        nombre: this.nombre.trim(),
                        apellido: this.apellido.trim(),
                        email: this.email.trim()
                    };

                    let url = "http://localhost:3000/personas";
                    let metodo = "POST";

                    if (this.personaSeleccionada) {
                        url += `/${this.personaSeleccionada.id}`;
                        metodo = "PUT";
                    }

                    const response = await fetch(url, {
                        method: metodo,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(persona)
                    });

                    if (!response.ok) {
                        this.mostrarAlerta("DNI o NIE no válido", "error");
                    } else {
                        this.inicializarDatosFormulario();

                        const mensaje = this.personaSeleccionada
                            ? "Persona modificada correctamente."
                            : "Persona guardada correctamente.";

                        Swal.fire({
                            icon: "success",
                            title: "Éxito",
                            text: mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(() => {
                            this.obtenerPersonas();
                        });
                    }
                }
            } catch (error) {
                console.error("Error al guardar la persona:", error);
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al guardar la persona en el servidor."
                });
            }
        },
        validarDniNie() {
            if (this.dni.length !== 0) {
                const dniNie = this.dni.trim().toUpperCase();

                const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

                if (!regexDniNie.test(dniNie)) {
                    this.mostrarAlerta("DNI o NIE no válido", "error");
                    return false;
                }

                const valor = dniNie.replace(/^[XYZ]/, letra => {
                    return letra === "X" ? "0" : letra === "Y" ? "1" : letra === "Z" ? "2" : letra;
                });

                const numero = parseInt(valor.slice(0, 9), 10);
                let letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numero % 23);

                if (letraCalculada !== dniNie.charAt(8)) {
                    this.mostrarAlerta("DNI o NIE no válido", "error");
                    return false;
                }
                return true;
            }
        },
        modificarCliente(clienteId) {
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            if (cliente) {
                this.clienteSeleccionado = cliente;
                this.dni = cliente.dni;
                this.nombre = cliente.nombre;
                this.apellido = cliente.apellido;
                this.email = cliente.email;

                this.mostrarAlerta("Datos del cliente listos para modificar", "info");
            } else {
                this.mostrarAlerta("Cliente no encontrado", "error");
            }
        },
        async modificarPersona(personaId) {
            const persona = this.personas.find(persona => persona.id === personaId);

            if (persona) {
                this.personaSeleccionada = persona;
                this.dniPersona = persona.dni;
                this.nombrePersona = persona.nombre;
                this.apellidoPersona = persona.apellido;
                this.emailPersona = persona.email;

                this.mostrarAlerta("Datos de la persona listos para modificar", "info");
            } else {
                this.mostrarAlerta("Persona no encontrada", "error");
            }
        },
        async obtenerClientes() {
            try {
                const response = await fetch("http://localhost:3000/clientes");

                if (!response.ok) {
                    this.mostrarAlerta("Error al obtener los clientes", "error");
                } else {
                    this.clientes = await response.json();
                }
            } catch (error) {
                console.error("Error al obtener los clientes:", error);
                await this.mostrarAlerta("Error al obtener los clientes", "error");
            }
        },
        async obtenerPersonas() {
            try {
                const response = await fetch("http://localhost:3000/personas");

                if (!response.ok) {
                    this.mostrarAlerta("Error al obtener los clientes", "error");
                } else {
                    this.personas = await response.json();
                }
            } catch (error) {
                console.error("Error al obtener los clientes:", error);
                await this.mostrarAlerta("Error al obtener los clientes", "error");
            }
        },
        async eliminarPersona(personaId) {
            const confirmation = await this.mostrarConfirmacionEliminar();
            if (confirmation) {
                const index = this.personas.findIndex(persona => persona.id === personaId);

                if (index !== -1) {
                    await fetch(`http://localhost:3000/personas/${personaId}`, {
                        method: "DELETE"
                    });
                    this.mostrarAlerta("Persona eliminada correctamente", "success");
                } else {
                    this.mostrarAlerta("Persona no encontrada", "error");
                }
            } else {
                this.mostrarAlerta("Operación cancelada", "info");
            }
        },
        async eliminarCliente(clienteId) {
            const confirmation = await this.mostrarConfirmacionEliminar();
            if (confirmation) {
                const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

                if (index !== -1) {
                    await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                        method: "DELETE"
                    });
                    this.mostrarAlerta("Cliente eliminado correctamente", "success");
                } else {
                    this.mostrarAlerta("Cliente no encontrado", "error");
                }
            } else {
                this.mostrarAlerta("Operación cancelada", "info");
            }
        },
        inicializarDatosFormulario() {
            this.nombre = "";
            this.apellido = "";
            this.dni = "";
            this.email = "";
            this.clienteSeleccionado = null;
            this.nombrePersona = "";
            this.apellidoPersona = "";
            this.dniPersona = "";
            this.emailPersona = "";
            this.mostrarAlerta("Campos limpiados", "info");
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
        async mostrarConfirmacionEliminar() {
            const result = await Swal.fire({
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

            return result.isConfirmed;
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
    <div class="container-fluid">
        <div id="map_section" class="row justify-content-center align-items-center">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3 w-25">
                        <span class="input-group-text custom-span">DNI/NIE:</span>
                        <input
                            id="dni"
                            v-model="dni"
                            class="form-control form-control-sm"
                            name="dni"
                            placeholder="DNI Cliente"
                            type="text"
                            @blur="validarDniNie"
                        />
                    </div>
                    <div class="input-group mb-3 w-75">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input
                            id="nombre"
                            ref="nombre"
                            v-model="nombre"
                            class="form-control"
                            name="nombre"
                            placeholder="Nombre Cliente"
                            type="text"
                        />
                    </div>
                    <div class="input-group mb-3 w-75">
                        <span class="input-group-text custom-span">Apellidos:</span>
                        <input
                            id="apellido"
                            v-model="apellido"
                            class="form-control"
                            name="apellido"
                            placeholder="Apellidos Cliente"
                            type="text"
                        />
                    </div>

                    <div class="input-group mb-3 w-50">
                        <span class="input-group-text custom-span">Email:</span>
                        <input
                            id="email"
                            v-model="email"
                            class="form-control"
                            name="email"
                            placeholder="e-mail cliente"
                            type="text"
                        />
                    </div>
                    <!-- Botones -->
                    <div class="text-center">
                        <button class="btn btn-primary m-2" type="button" @click="guardarCliente">Guardar</button>
                        <button class="btn btn-secondary" type="button" @click="inicializarDatosFormulario">
                            Limpiar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <hr />
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold text-black">Listado Clientes</h5>
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

    <!-- ZONA PERSONAS **/ -->
    <hr />
    <div id="map_selection" class="container row justify-content-center align-items-center mt-4">
        <form class="form-inline col-12 col-m-6 col-lg-8 mx-auto">
            <div class="input-group mb-3 w-25">
                <span class="input-group-text custom-span">DNI/NIE:</span>
                <input
                    id="dni"
                    v-model="dni"
                    class="form-control form-control-sm"
                    name="dni"
                    placeholder="DNI Cliente"
                    type="text"
                    @blur="validarDniNie"
                />
            </div>
            <div class="input-group mb-3 w-75">
                <span class="input-group-text custom-span">Nombre:</span>
                <input
                    id="nombre"
                    ref="nombre"
                    v-model="nombre"
                    class="form-control"
                    name="nombre"
                    placeholder="Nombre Cliente"
                    type="text"
                />
            </div>
            <div class="input-group mb-3 w-75">
                <span class="input-group-text custom-span">Apellidos:</span>
                <input
                    id="apellido"
                    v-model="apellido"
                    class="form-control"
                    name="apellido"
                    placeholder="Apellidos Cliente"
                    type="text"
                />
            </div>

            <div class="input-group mb-3 w-50">
                <span class="input-group-text custom-span">Email:</span>
                <input
                    id="email"
                    v-model="email"
                    class="form-control"
                    name="email"
                    placeholder="e-mail cliente"
                    type="text"
                />
            </div>
            <!-- Botones -->
            <div class="text-center">
                <button class="btn btn-primary m-2" type="button" @click="guardarPersona()">Guardar</button>
                <button class="btn btn-secondary" type="button" @click="inicializarDatosFormulario">Limpiar</button>
            </div>
        </form>
        <hr />
    </div>
    <div id="map_selection" class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold text-black">Listado Personas</h5>
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
                        <tr v-for="persona in personas" :key="persona.id">
                            <td class="text-center">{{ persona.dni }}</td>
                            <td>{{ persona.apellido }}</td>
                            <td>{{ persona.nombre }}</td>
                            <td class="text-center">{{ persona.email }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="modificarPersona(persona.id)">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-danger m-2" @click="eliminarPersona(persona.id)">
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
    <footer-pedro></footer-pedro>
</template>

<style></style>