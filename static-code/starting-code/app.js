const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "Finish the course and learn Vue!",
      courseGoalB: "Master Vue and build amazing apps!",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoals() {
      return Math.random() < 0.5 ? this.courseGoalA : this.courseGoalB;
    },
    outputHtml() {
      return "<h1>This is a h1 tag</h1>";
    },
  },
});

app.mount("#user-goal");
