import {createApp} from "vue";
import App from "./App.vue";
import NavBar from "@/components/NavBar.vue";

// Bootstrap assets
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["Authorization"] = "Barer " + localStorage.getItem("token");

createApp(App).use(router).component("NavBar", NavBar).mount("#app");
