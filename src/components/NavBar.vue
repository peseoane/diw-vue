<script>
import {IconSearch} from "@tabler/icons-vue";
export default {
  computed: {
    clientesExists() {
      return this.$router.hasRoute('clientes');
    },
    ventasExists() {
      return this.$router.hasRoute('ventas ');
    },
    contactoExists() {
      return this.$router.hasRoute(' contacto');
    },
    articulosExists() {
      return this.$router.hasRoute(' articulos ')
    }
  },
  components:{
    IconSearch
  }
}
</script>

<template>
  <div class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-white active" href="#">My Web</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div>
          <ul class="navbar-nav gap-4 d-flex align-content-between justify-content-between w-100">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item"  v-if="clientesExists">
              <router-link to="/clientes" class="nav-link">Clientes</router-link>
            </li>
            <li class="nav-item"  v-if="articulosExists">
              <router-link to="/articulos" class="nav-link">Articulos</router-link>
            </li>
            <li class="nav-item"  v-if="ventasExists">
              <router-link to="/ventas" class="nav-link">Ventas</router-link>
            </li>
            <li class="nav-item"  v-if="contactoExists">
              <router-link to="/contacto" class="nav-link">Contacto</router-link>
            </li>
          </ul>
        </div>
        <form class="d-flex btn-prevent">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-light" type="submit"><IconSearch></IconSearch></button>
        </form>
      </div>
    </nav>
  </div>
</template>

<style scoped>
a{
  color: white !important;
}

a:hover{
  color: black !important;
}
</style>