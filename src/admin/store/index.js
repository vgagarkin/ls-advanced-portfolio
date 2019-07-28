import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import skills from "./modules/skills";
import categories from "./modules/categories";

export default new Vuex.Store({
  modules: {
    skills,
    categories
  }
});
