import {createApp} from "vue";
import App from "./App.vue";
import NavBar from "@/components/NavBar.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/basic.css";

createApp(App).use(router).component("NavBar", NavBar).mount("#app");