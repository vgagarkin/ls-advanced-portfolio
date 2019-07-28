import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("./pages/about")
    },
    {
      path: "/reviews",
      component: () => import("./pages/reviews")
    },
    {
      path: "/projects",
      component: () => import("./pages/projects")
    },
    {
      path: "/login",
      component: () => import("./pages/login")
    }
  ]
});
