const app = Vue.createApp({
  data() {
    return {
      result: 0,
      timeoutRef: null,
    };
  },
  watch: {
    result() {
      if (this.timeoutRef) {
        clearTimeout(this.timeoutRef);
      }
      this.timeoutRef = setTimeout(() => {
        this.result = 0;
      }, 5000);
    },
  },
  computed: {
    resultText() {
      if (this.result > 37) {
        return "Too much!";
      } else if (this.result < 37) {
        return "Not there yet";
      } else {
        return "Bingo!";
      }
    },
  },
  methods: {
    add(num) {
      this.result += num;
    },
  },
});

app.mount("#assignment");
