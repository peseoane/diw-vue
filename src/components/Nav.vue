<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          :src="logo"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Web de pruebas
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Artículos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Clientes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Ventas</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "@/assets/nato.svg";
export default {
  name: "Nav",
  data() {
    return { logo };
  },
};
</script>

<style scoped></style>