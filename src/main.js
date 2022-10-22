import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

import axois from "axios";
import VueAxios from "vue-axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPerson, faPersonDress } from "@fortawesome/free-solid-svg-icons";

library.add([faPerson, faPersonDress]);

Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

const axiosInstance = axois.create({
  baseURL: "https://nfsb.schwiha.de/",
  timeout: 5000,
});

Vue.use(VueAxios, axiosInstance);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
