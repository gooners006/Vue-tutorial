const app = Vue.createApp({
  data() {
    return {
      output: "",
      confirmedOutput: "",
    };
  },
  methods: {
    showAlert() {
      alert("Ahihi do ngok");
    },
    handleInput(e) {
      this.output = e.target.value;
    },
    handleConfirmInput(e) {
      this.confirmedOutput = e.target.value;
    },
  },
});

app.mount("#assignment");
