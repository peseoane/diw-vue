<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Bienvenido a  Vue.js App"/>
  <PrimerasPruebas mensaje="Primeras pruebas" />
  <ListaTareas mensajeL="Lista tareas" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PrimerasPruebas from './components/PrimerasPruebas.vue';
import ListaTareas from './components/ListaTareas.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    PrimerasPruebas,
    ListaTareas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
