import Vue from "vue";
import Flickity from "vue-flickity";

const oneReview = {
  template: "#review",
  props: {
    review: Object
  }
};

const btns = {
  template: "#btns"
};

new Vue({
  el: "#reviews-container",
  template: "#reviews-list",
  components: {
    btns,
    oneReview,
    Flickity
  },
  methods: {
    avatar(data) {
      return data.map(review => {
        const avatarImage = require(`../images/content/${review.avatar}`);
        review.avatar = avatarImage;

        return review;
      });
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.$refs.flickity.next();
          break;
        case "prev":
          this.$refs.flickity.previous();
          break;
      }
    }
  },
  data() {
    return {
      reviews: [],
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        cellAlign: "left",
        contain: true,
        draggable: false
      }
    };
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.avatar(data);
  }
});
