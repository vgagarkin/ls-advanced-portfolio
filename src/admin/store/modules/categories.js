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
    },
    EDIT_CATEGORY: (state, editCategory) => {
      state.categories = state.categories.map(category => {
        return category.id === editCategory.id ? editCategory : category;
      });
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
    },
    async saveCategory({ commit }, editCategory) {
      try {
        const response = await this.$axios.post(
          `/categories/${editCategory.id}`,
          editCategory
        );
        console.log(editCategory);
        commit("EDIT_CATEGORY", editCategory);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    }
  }
};
