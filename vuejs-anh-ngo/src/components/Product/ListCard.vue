<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const { product } = defineProps(['product']);

const handleNavigate = () => {
  router.push(`product/${product.id}`);
};
</script>

<template>
  <div class="card" @click="handleNavigate">
    <img :src="product.thumbnail" alt="" />
    <div class="card-text">
      <h2>{{ product.title }}</h2>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 310px;
  overflow: hidden;
  border-radius: 2%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
  margin-right: 20px;
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 190px;
  margin: 0;
}

.card .card-text {
  padding: 0 5px;
}

.card .card-text h2 {
  font-weight: bold;
}
</style>
