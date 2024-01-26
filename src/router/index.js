import PaginaPrincipal from '@/components/PaginaPrincipal.vue';
import TableClientes from "@/components/TableClientes.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'PaginaInicial',
        component: PaginaPrincipal
    },
    {
        path: '/clientes',
        name: 'TableClientes',
        component: TableClientes
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;