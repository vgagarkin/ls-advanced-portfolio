import { convertIntoFormData } from "@/helpers/forms";

export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    ADD_REVIEW: (state, newReview) => {
      state.reviews.push(newReview);
    },
    SET_REVIEWS: (state, reviews) => {
      state.reviews = reviews;
    },
    REMOVE_REVIEW: (state, reviewId) => {
      state.reviews = state.reviews.filter(review => review.id !== reviewId);
    }
  },
  actions: {
    async addReview({ commit }, newReview) {
      const newRewiewFormData = convertIntoFormData(newReview);
      try {
        const { data: review } = await this.$axios.post(
          "/reviews",
          newRewiewFormData
        );
        commit("ADD_REVIEW", review);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    },
    async fetchReviews({ commit }) {
      try {
        const { data: reviews } = await this.$axios.get("/reviews/152");
        commit("SET_REVIEWS", reviews.reverse());
        return reviews;
      } catch (error) {
        console.log(error);
      }
    },
    async removeReview({ commit }, reviewId) {
      try {
        const { data: reviews } = await this.$axios.delete(
          `/reviews/${reviewId}`
        );
        commit("REMOVE_REVIEW", reviewId);
        return reviews;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
