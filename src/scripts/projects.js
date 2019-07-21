import Vue from "vue";

const thumbs = {
  template: "#projects-thumbs",
  props: {
    projects: Array,
    currentProject: Object
  },
  methods: {
    makeThumbBtn() {
      const thumbItem = this.$refs["thumb-btn"];

      thumbItem.map((item, index) => {
        item.style.backgroundImage =
          "url(" + this.projects[index].images.small + ")";
        return item;
      });
    }
  },
  mounted() {
    this.makeThumbBtn();
  }
};

const mama = "zaluperrrrr";
console.log(mama);

const btns = {
  template: "#projects-btns",
  props: {
    currentIndex: Number,
    projectsLengthIndex: Number
  }
};

const images = {
  template: "#projects-images",
  components: {
    thumbs,
    btns
  },
  computed: {
    reversedProjects() {
      return [...this.projects].reverse();
    }
  },
  props: {
    projects: Array,
    currentProject: Object,
    currentIndex: Number,
    projectsLengthIndex: Number
  }
};

const tags = {
  template: "#projects-tags",
  props: {
    tags: Array
  }
};

const info = {
  template: "#projects-info",
  components: {
    tags
  },
  props: {
    currentProject: Object
  },
  computed: {
    tagsArray() {
      return this.currentProject.tags.split(", ");
    }
  }
};

new Vue({
  el: "#projects-slider",
  template: "#projects-container",
  components: {
    images,
    info
  },
  data() {
    return {
      projects: [],
      currentIndex: 0,
      projectsLengthIndex: 0
    };
  },
  computed: {
    currentProject() {
      return this.projects[this.currentIndex];
    }
  },
  methods: {
    arrWithRequiredImages(data) {
      return data.map(item => {
        const projectImage = require(`../images/content/${item.images.big}`);
        const projectThumb = require(`../images/content/${item.images.small}`);

        item.images.big = projectImage;
        item.images.small = projectThumb;

        return item;
      });
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          if (this.currentIndex < this.projectsLengthIndex) this.currentIndex++;
          break;
        case "prev":
          if (this.currentIndex > 0) this.currentIndex--;
          break;
      }
    },
    handleSlideTo(projectIndex) {
      this.currentIndex = projectIndex - 1;
    }
  },
  created() {
    const data = require("../data/projects.json");

    this.projects = this.arrWithRequiredImages(data);

    this.projectsLengthIndex = this.projects.length - 1;
  }
});
