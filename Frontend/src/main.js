import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia).use(router).use(vuetify);

router.isReady().then(() => {
  app.mount("#app");
});
