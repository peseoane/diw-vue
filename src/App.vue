<template>
    <Nav></Nav>
    <TableClientes></TableClientes>
</template>

<script>
import TableClientes from "@/components/TableClientes.vue";
import Nav from "@/components/Nav.vue";
import FormularioClientes from "@/components/FormularioClientes.vue";
export default {
    name: "App",
    components: {
        FormularioClientes,
        TableClientes,
        Nav
    }
};
</script>

<style></style>
