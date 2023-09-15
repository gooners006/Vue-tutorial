const app = Vue.createApp({
  data() {
    return {
      tasks: [],
      inputValue: "",
      isShowingList: true,
    };
  },
  methods: {
    addTask() {
      if (this.inputValue && this.isShowingList) {
        this.tasks.push(this.inputValue);
      }
    },
    toggleList() {
      this.isShowingList = !this.isShowingList;
    },
  },
  computed: {
    buttonText() {
      return this.isShowingList ? "Hide List" : "Show List";
    },
  },
});

app.mount("#assignment");
