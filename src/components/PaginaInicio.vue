<script>
import NavBar from "@/components/NavBar.vue";
export default {
    name: "PaginaInicio",
    components: {
        NavBar
    }
};
</script>

<template>
    <div>
        <NavBar></NavBar>
    </div>

    <div class="d-flex justify-content-center align-items-center gap-4 mt-4">
        <div class="card rounded" style="width: 18rem">
            <i class="bi bi-person-circle icon"></i>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Apartado para poder gestionar a nuestros clientes.</p>
                <router-link class="btn btn-primary" to="/clientes">Gestion Clientes</router-link>
            </div>
        </div>

        <div class="card rounded" style="width: 18rem">
            <i class="bi bi-table icon"></i>
            <div class="card-body">
                <h5 class="card-title">Gestion Tareas</h5>
                <p class="card-text">Apartado para poder gestionar las tareas de los usuarios.</p>
                <router-link class="btn btn-primary" to="/tareas">Gestion Tareas</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.icon {
    font-size: 8em;
}
</style>