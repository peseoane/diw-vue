<script setup>
import {useRouter} from "vue-router";
import {faker} from "@faker-js/faker/locale/pt_PT";

const router = useRouter();

const navigateToClientes = () => {
    router.push("/clientes");
};

const createRandomUser = () => {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        secondname: faker.person.jobTitle(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.past(),
        lorem: faker.lorem.paragraphs()
    };
};

const USERS = Array.from({length: 5}, createRandomUser);
</script>

<template>
    <div class="container text-center">
        <h1>Bienvenido</h1>
        <button class="btn btn-primary" @click="navigateToClientes">Acceder</button>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Name</th>
                <th>Secondname</th>
                <th>Email</th>
                <th>Birthdate</th>
                <th>Lorem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in USERS" :key="user.userId">
                <td><img class="img-thumbnail" :src="user.avatar" :alt="user.username" /></td>
                <td>{{ user.username }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.secondname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.birthdate }}</td>
                <td>{{ user.lorem }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
