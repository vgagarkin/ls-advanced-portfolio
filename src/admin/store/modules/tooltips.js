export default {
  namespaced: true,
  state: {
    visible: false,
    text: "",
    type: ""
  },
  mutations: {
    SET_VISIBLE(state, trueOrFalse) {
      state.visible = trueOrFalse;
    },
    SET_TEXT(state, text) {
      state.text = text;
    },
    SET_TYPE(state, type) {
      state.type = type;
    }
  },
  actions: {
    showTooltip({ commit }, payload) {
      const availableTypeOptions = ["success", "overload", "error"];
      if (availableTypeOptions.includes(payload.type) === false) {
        console.warn("Передан не допустимый тип для тултипов");
      }
      commit("SET_VISIBLE", true);
      commit("SET_TYPE", payload.type);
      commit("SET_TEXT", payload.text);
    },

    closeTooltip({ commit }) {
      commit("SET_VISIBLE", false);
    }
  }
};
