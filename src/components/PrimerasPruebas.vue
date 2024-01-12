<template>
    <hr>
    <div class="hello">
        <h3>{{ mensaje }}</h3>
        <h4>El resultado de la suma es {{ resultadoSuma }}</h4>
        <h5>Listado de Items:</h5>
        <ul>
            <li v-for="item in listaItems" :key="item.id">
              {{ item.id }} -- {{ item.nombre }} -- {{ item.apellido }}
            </li>
        </ul>
        <h5>Nombre del cliente: {{ nombreCliente }}</h5>
        <button @click='incrementar'>Incrementar</button>
        <h5>Contador: {{ contador }}</h5>
        <div>
            <input v-model="number1" type="text" placeholder="Número 1">
            <input v-model="number2" type="text" placeholder="Número 2">
            <button @click="sumar">Sumar</button>
            <h5>resultado de la suma: {{ suma }}</h5>
            <p v-if='suma >= 0'>La suma es mayor que 0</p>
            <p v-else>La suma es menor que 0</p>
        </div>
        <div>
            <input v-model="n1" type="text" placeholder="Número 1">
            <input v-model="n2" type="text" placeholder="Número 2">
            <button @click="restar">Restar</button>
            <h5>resultado de la resta: {{ resta }}</h5>
            <p v-if='resta >= 0'>La resta es mayor que 0</p>
            <p v-else>La resta es menor que 0</p>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    name: "PrimerasPruebas",
    props: {
        mensaje: String,
        numero1: {
            type: Number,
            default: 0
        },
        numero2: {
            type: Number,
            default: 0
        },
        nombre: {
            type: String,
            default: "Pepe"
        },
        apellidos: {
            type: String,
            default: "Perez"
        }
    },
    computed: {
        nombreCliente(){
            return this.nombre + ' ' + this.apellidos;
        }
    },
    watch: {
        contador(nuevoMensaje, viejoMensaje) {
            alert(`Hemos pasado de ${viejoMensaje} a ${nuevoMensaje}`);
        }
    },
    methods: {
        incrementar(){
            this.contador++ 
        },
        sumar() {
            // Convierte a número
            const num1 = parseFloat(this.number1);
            const num2 = parseFloat(this.number2);
            // Comprueba si son números
            if(isNaN(num1) || isNaN(num2)){
                alert('No son números');
            } else {
                this.suma = num1 + num2;
            }
        },
        restar() {
            const num1 = parseFloat(this.n1);
            const num2 = parseFloat(this.n2);
            // Comprueba si son números
            if(isNaN(num1) || isNaN(num2)){
                alert('No son números');
            } else {
                this.resta = num1 - num2;
            }
        }
    },
    data() {
        return{
            resultadoSuma: this.numero1 + this.numero2,
            listaItems: [
                { id: 1, nombre: 'Juan', apellido: 'Perez' },
                { id: 2, nombre: 'Susana', apellido: 'Garcia' },
                { id: 3, nombre: 'Luis', apellido: 'Gomez' },
                { id: 4, nombre: 'Ana', apellido: 'Gonzalez' },
                { id: 5, nombre: 'Maria', apellido: 'Lopez' },
            ],
            contador: 0,
            suma: 0,
            resta: 0,
            nuevoMensaje: "este es el nuevo mensaje",
            viejoMensaje: "este es el viejo mensaje"
        };
    }
}
</script>

<style>

</style>