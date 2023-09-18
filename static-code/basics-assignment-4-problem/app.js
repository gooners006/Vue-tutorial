const app = Vue.createApp({
  data() {
    return {
      inputClass: "",
      showParagraph: true,
      bgColor:''
    };
  },
  computed: {
    pClass() {
      return this.showParagraph ? "visible" : "hidden";
    },
  },
  methods: {
    handleEnter(event) {
      this.inputClass = event.target.value;
    },
    handleToggle() {
      this.showParagraph = !this.showParagraph;
    },
    handleBgColor(event) {
      this.bgColor = event.target.value;
    },
  },
});

app.mount("#assignment");
