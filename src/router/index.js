import Vue from "vue";
import VueRouter from "vue-router";
import MapOverview from "@/views/MapOverview.vue";
import CompareView from "@/views/CompareView.vue";
import HomeView from "@/views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/map",
    name: "MapOverview",
    component: MapOverview,
  },
  {
    path: "/compare",
    name: "CompareView",
    component: CompareView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
