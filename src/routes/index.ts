import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./MainPage.vue";
import DetailMovie from "./DetailMovie.vue";
import NotFound from "./NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
      children: [
        {
          path: "/movie/:id",
          name: "DetailMovie",
          component: DetailMovie
        }
      ]
    },
    {
      path: "/:notFound(.*)",
      component: NotFound
    }
  ]
});
