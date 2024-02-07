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

    <div class="d-flex justify-content-center align-items-center gap-4">
        <button class="btn btn-primary">Gestion Clientes</button>
        <button class="btn btn-primary">Gestion Vendedores</button>
        <button class="btn btn-primary">Gestion Articulos</button>
        <button class="btn btn-primary">Contacto</button>
    </div>
</template>

<style scoped></style>
