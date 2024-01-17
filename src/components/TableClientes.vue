<template>
  <div id="tabla-clientes" class="container grid">
    <table class="table border-black justify-content-center">
      <thead>
        <tr class="text-center fw-bolder">
          <th class="">Nombre</th>
          <th>Apellido</th>
          <th class="font-monospace bg-danger text-white fw-bolder">DNI</th>
          <th>email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center align-middle"
          v-for="(cliente, id) in clientes"
          :key="id"
        >
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td class="font-monospace bg-danger-subtle fw-bolder">
            {{ cliente.dni }}
          </td>
          <td>{{ cliente.email }}</td>
          <td class="">
            <button class="btn btn-danger me-2">Eliminar</button>
            <button class="btn btn-warning">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "TableClientes",
  data() {
    return {
      clientes: [
        {
          nombre: "Juan",
          apellido: "Perez",
          dni: "12345678",
          email: "juan.perez@hotmail.com",
        },
        {
          nombre: "Maria",
          apellido: "Gomez",
          dni: "87654321",
          email: "maria.gomez@gmail.com",
        },
      ],
    };
  },
};
</script>

<style scoped></style>