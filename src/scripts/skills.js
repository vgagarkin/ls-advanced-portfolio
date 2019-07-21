import Vue from "vue";

const skill = {
  template: "#skill",
  props: {
    skillName: String,
    skillValue: Number
  },
  methods: {
    fillSkill() {
      const skillCircle = this.$refs["skill-value"];
      const circleDashArray = parseInt(
        getComputedStyle(skillCircle).getPropertyValue("stroke-dasharray")
      );
      const circleDashOffset =
        (circleDashArray / 100) * (100 - this.skillValue);

      skillCircle.style.strokeDashoffset = circleDashOffset;
    }
  },
  mounted() {
    this.fillSkill();
  }
};

const row = {
  template: "#skills-row",
  props: {
    skill: Object
  },
  components: {
    skill
  }
};

new Vue({
  el: "#skills-container",
  template: "#skills-list",
  components: {
    row
  },
  data() {
    return {
      skills: []
    };
  },
  created() {
    const data = require("../data/skills.json");
    this.skills = data;
  }
});
