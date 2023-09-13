const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    add() {
      this.counter++;
    },
    subtract() {
      this.counter--;
    },
    handleSubmit() {
      alert("Submitting");
    },
    handleInput(e) {
      this.name = e.target.value;
    },
    handleConfirm() {
      this.confirmedName = this.name;
    },
  },
});

app.mount("#events");
