export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    ADD_CATEGORIES: (state, newCategory) => {
      state.categories.push(newCategory);
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await this.$axios.get("/categories");
        commit("SET_CATEGORIES", response.data.reverse());
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async addNewCategory({ commit }, newCategory) {
      try {
        const { data: response } = await this.$axios.post(
          "/categories",
          newCategory
        );
        commit("ADD_CATEGORIES", response);
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    }
  }
};
