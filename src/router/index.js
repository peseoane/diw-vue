import { createRouter, createWebHistory } from 'vue-router'
import TableClientes from '@/components/TableClientes.vue'
import PaginaInicio from '@/components/PaginaInicio.vue'

const routes = [
  {
    path: '/',
    name:'paginainicio',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TableClientes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
