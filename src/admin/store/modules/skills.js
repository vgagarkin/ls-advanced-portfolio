export default {
  namespaced: true,
  state: {
    skills: []
  },
  mutations: {
    SET_SKILLS: (state, skills) => {
      state.skills = skills;
    },
    ADD_SKILL: (state, newSkill) => {
      state.skills.push(newSkill);
    },
    EDIT_SKILL: (state, existedSkill) => {
      state.skills = state.skills.map(skill => {
        return skill.id === existedSkill.id ? existedSkill : skill;
      });
    },
    REMOVE_SKILL: (state, skillId) => {
      state.skills = state.skills.filter(skill => skill.id !== skillId);
    }
  },
  actions: {
    async addSkill({ commit }, newSkill) {
      try {
        const { data: skill } = await this.$axios.post("/skills", newSkill);
        commit("ADD_SKILL", skill);
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async saveSkill({ commit }, existedSkill) {
      try {
        const response = await this.$axios.post(
          `/skills/${existedSkill.id}`,
          existedSkill
        );
        commit("EDIT_SKILL", existedSkill);
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async removeSkill({ commit }, skillId) {
      try {
        const response = await this.$axios.delete(`/skills/${skillId}`);
        commit("REMOVE_SKILL", skillId);
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async fetchSkills({ commit }, userId) {
      try {
        const response = await this.$axios.get(`/skills/${userId}`);
        commit("SET_SKILLS", response.data.reverse());
        return response;
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
    getSkills: state => {
      return state.skills;
    }
  }
};
