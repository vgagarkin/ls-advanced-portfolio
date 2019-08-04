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
    },
    REMOVE_CATEGORY: (state, categoryId) => {
      state.categories = state.categories.filter(
        category => category.id !== categoryId
      );
    }
  },
  actions: {
    async fetchCategories({ commit }, userId) {
      try {
        const response = await this.$axios.get(`/categories/${userId}`);
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
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async saveCategory({ commit }, editCategory) {
      try {
        const response = await this.$axios.post(
          `/categories/${editCategory.id}`,
          editCategory
        );
        commit("EDIT_CATEGORY", editCategory);
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async deleteCategory({ commit }, categoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${categoryId}`);
        commit("REMOVE_CATEGORY", categoryId);
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    }
  },
  getters: {
    categoriesList: state => {
      const hui = this.actions.fetchCategories();
      console.log(hui);
      return state.categories.length === 0
        ? this.actions.fetchCategories()
        : state.categories;
    }
  }
};
