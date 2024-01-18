<template>
  <div class="container">
    <h2 class="text-center p-4">Gestión de clientes</h2>
    <form class="row g-3">
      <div class="">
        <label for="inputNombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inputNombre" />
      </div>
      <div class="">
        <label for="inputApellido" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="inputApellido" />
      </div>
      <div class="">
        <label for="inputDni" class="form-label">DNI</label>
        <input type="text" class="form-control" id="inputDni" />
      </div>
      <div class="">
        <label for="inputEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail" />
      </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="submit" class="btn btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormularioClientes",
};
</script>

<style></style>
