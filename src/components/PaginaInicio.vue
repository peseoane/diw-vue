<script>
import NavBar from "@/components/NavBar.vue";
import FooterPedro from "@/components/FooterPedro.vue";

export default {
    name: "PaginaInicio",
    components: {
        NavBar,
        FooterPedro
    },
    data() {
        return {
            usuario: "a22pedrovsp"
        };
    }
};
</script>

<template>
    <NavBar></NavBar>
    <div class="flex-column">
        <div class="flex-row">
            <div class="d-flex justify-content-center align-items-center gap-4 mt-4">
                <div class="card rounded">
                    <div class="card-header">
                        <i class="bi bi-person-circle"> Mediante JSON Server </i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Clientes</h5>
                        <p class="card-text">Apartado para poder gestionar a nuestros clientes.</p>
                    </div>
                    <div class="card-footer">
                        <router-link class="btn btn-primary" to="/clientes">Acceder a gestion Clientes</router-link>
                    </div>
                </div>

                <div class="card rounded">
                    <div class="card-header">
                        <i class="bi bi-table"> Mediante MongoDB</i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Gestion Tareas</h5>
                        <p class="card-text">Apartado para poder gestionar las tareas de los usuarios.</p>
                    </div>
                    <div class="card-footer">
                        <router-link class="btn btn-primary" to="/tareas">Acceder a gestion Tareas</router-link>
                    </div>
                </div>
            </div>
            <hr />
            <div class="d-flex row justify-content-center align-items-center">
                <!-- foto should be cropped to be rounded at centered and bellow a text {{ usuario }}, photo should be 50% width of vh -->
                <img src="../assets/lolita.jpg" alt="Lolita" class="row rounded-circle w-50 h-50" />
                <p class="row align-content-center align-items-center justify-content-center">
                    <strong class="row align-content-center align-items-center justify-content-center"
                        >Bienvenido: </strong
                    >{{ usuario }}
                </p>
            </div>
        </div>
    </div>
    <footer-pedro></footer-pedro>
</template>

<style scoped></style>