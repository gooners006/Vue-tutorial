const app = Vue.createApp({
  data() {
    return {
      name: "Viet Anh",
      age: new Date().getFullYear() - 1996,
      favNum: Math.random().toFixed(1)*10,
      imgUrl:'https://avatars.githubusercontent.com/u/37095499?v=4'
    };
  },
});

app.mount("#assignment");
