<template>
    <Nav></Nav>
    <TableClientes></TableClientes>
</template>

<script>
import TableClientes from "@/components/TableClientes.vue";
import Nav from "@/components/Nav.vue";
export default {
    name: "App",
    components: {
        TableClientes,
        Nav
    }
};
</script>

<style></style>