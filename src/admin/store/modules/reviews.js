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
    },
    CURRENT_REVIEW(state, review) {
      state.currentReview = review;
    },
    EDIT_REVIEW(state, editedReview) {
      state.reviews = state.reviews.map(review => {
        return review.id === editedReview.id ? editedReview : review;
      });
    }
  },
  actions: {
    async addReview({ commit }, newReview) {
      const newReviewFormData = convertIntoFormData(newReview);
      try {
        const { data: review } = await this.$axios.post(
          "/reviews",
          newReviewFormData
        );
        commit("ADD_REVIEW", review);
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async fetchReviews({ commit }, userId) {
      try {
        const { data: reviews } = await this.$axios.get(`/reviews/${userId}`);
        commit("SET_REVIEWS", reviews.reverse());
        return reviews;
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
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
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    },
    async editReview({ commit }, editedReview) {
      const newReviewFormData = convertIntoFormData(editedReview);
      try {
        const { data: review } = await this.$axios.post(
          `/reviews/${editedReview.id}`,
          newReviewFormData
        );
        commit("EDIT_REVIEW", review.review);
        return review;
      } catch (error) {
        const arrErrors = [];
        Object.keys(error.response.data.errors).forEach(oneError => {
          arrErrors.push(error.response.data.errors[oneError][0]);
        });
        throw new Error(arrErrors.join(",") || error.response.data.message);
      }
    }
  }
};
