export default {
  namespaced: true,
  state: {
    skills: []
  },
  mutations: {
    SET_SKILLS: (state, skills) => {
      state.skills = skills;
    }
  },
  actions: {
    async addSkill(store, newSkill) {
      try {
        const response = await this.$axios.post("/skills", newSkill);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async fetchSkills({ commit }) {
      try {
        const response = await this.$axios.get("/skills/152");
        commit("SET_SKILLS", response.data.reverse());
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
