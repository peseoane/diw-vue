import {createRouter, createWebHistory} from "vue-router";
import TableClientes from "@/components/TableClientes.vue";
import PaginaInicio from "@/components/PaginaInicio.vue";
import TablaTareas from "@/components/TablaTareas.vue";

const routes = [
    {
        path: "/",
        name: "paginainicio",
        component: PaginaInicio
    },
    {
        path: "/clientes",
        name: "clientes",
        component: TableClientes
    },
    {
        path: "/tareas",
        name: "tareas",
        component: TablaTareas
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;