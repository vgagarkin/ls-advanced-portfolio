import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import skills from "./modules/skills";
import categories from "./modules/categories";
import user from "./modules/user";
import reviews from "./modules/reviews";
import tooltips from "./modules/tooltips";

export default new Vuex.Store({
  modules: {
    skills,
    categories,
    user,
    reviews,
    tooltips
  }
});
