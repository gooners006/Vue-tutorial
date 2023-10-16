<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  deleteProduct,
  getSingleProduct,
} from '@/services/modules/ProductService';
import type { Product } from '@/stores/products';

import TheLoader from '../TheLoader.vue';
import ProductForm from './ProductForm.vue';

// ---DATA---
const route = useRoute();
const router = useRouter();
const currentProduct = ref<Product>({
  value: undefined,
  id: 0,
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
  thumbnail: '',
  images: [],
});
const isLoading = ref(true);
const slideIndex = ref(0);
const errorMessage = ref('');
const isOpeningForm = ref(false);
// ---METHODS---
const navigateSlide = (n: number) => {
  if (currentProduct.value.images) {
    if (slideIndex.value === currentProduct.value.images.length - 1) {
      slideIndex.value = 0;
    } else {
      slideIndex.value += n;
    }
  }
};
const getSlide = (n: number) => {
  slideIndex.value = n;
};
const fetchProduct = async () => {
  isLoading.value = true;
  try {
    const { data } = await getSingleProduct(Number(route.params.id));
    currentProduct.value = data;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Error) {
      errorMessage.value = (error.cause as { message: string }).message;
    } else {
      errorMessage.value = 'Unknown error';
      throw error;
    }
  }
};

const toggleForm = (status: boolean) => {
  isOpeningForm.value = status;
};

const handleDeleteProduct = async () => {
  isLoading.value = true;
  try {
    await deleteProduct(currentProduct.value.id);
    isLoading.value = false;
    router.push('/product-list');
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Error) {
      errorMessage.value = (error.cause as { message: string }).message;
    } else {
      errorMessage.value = 'Unknown error';
      throw error;
    }
  }
};

// --- EFFECTS ---
onMounted(fetchProduct);
</script>

<template>
  <TheLoader v-if="isLoading" class="spinner" />
  <div v-else>
    <h1>{{ currentProduct.title }}</h1>
    <div class="content">
      <div class="left-section">
        <div class="slide-container">
          <div
            class="main-image"
            v-for="(item, index) in currentProduct.images"
            :key="item"
            :style="{ display: index === slideIndex ? 'flex' : 'none' }"
          >
            <div class="image-index-text">
              {{ index + 1 }}/{{ currentProduct.images.length }}
            </div>
            <img :src="currentProduct.images[index]" :alt="`image-${index}`" />
          </div>

          <a class="prev" @click="navigateSlide(-1)">❮</a>
          <a class="next" @click="navigateSlide(1)">❯</a>

          <div class="caption-container">
            <p id="caption">{{ currentProduct.description }}</p>
          </div>

          <div class="preview-row">
            <div
              class="preview-item"
              v-for="(item, index) in currentProduct.images"
              :key="item"
            >
              <img
                class="demo cursor"
                :class="{ active: index === slideIndex }"
                :src="currentProduct.images[index]"
                @click="getSlide(index)"
                :alt="`image-${index}`"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="right-section">
        <h2>Brand: {{ currentProduct.brand }}</h2>
        <h2>Category: {{ currentProduct.category }}</h2>
        <h3>Stock: {{ currentProduct.stock }}</h3>
        <span>Ratings: </span>
        <span
          class="fa fa-star"
          :class="{ checked: index + 1 < currentProduct.rating }"
          v-for="(item, index) in Array(5)"
          :key="index"
        ></span>
        <p class="price">
          Price:
          {{
            (
              (currentProduct.price *
                (100 - currentProduct.discountPercentage)) /
              100
            ).toFixed(2)
          }}$
          <span class="original"> {{ currentProduct.price }}$ </span>
        </p>
        <button @click="toggleForm(true)" class="btn edit-item-button">
          Edit Item
        </button>
        <button @click="handleDeleteProduct" class="btn delete-item-button">
          Delete Item
        </button>
      </div>
    </div>
    <ProductForm
      v-if="isOpeningForm"
      @toggleForm="toggleForm"
      @refreshData="fetchProduct"
      :initialValues="{
        id: currentProduct.id,
        title: currentProduct.title,
        description: currentProduct.description,
        price: currentProduct.price,
        discountPercentage: currentProduct.discountPercentage,
        stock: currentProduct.stock,
        brand: currentProduct.brand,
        category: currentProduct.category,
        images: currentProduct.images,
      }"
    />
  </div>
</template>

<style scoped>
img {
  vertical-align: middle;
}
.content {
  display: flex;
}

.left-section {
  width: 50%;
  padding: 1em;
}
.right-section {
  width: 50%;
  padding: 1em;
}

/* Position the image container (needed to position the left and right arrows) */
.slide-container {
  position: relative;
}

/* Hide the images by default */
.main-image {
  display: none;
}

.main-image img {
  margin: 0 auto;
  max-width: 100%;
  max-height: 200px;
  height: auto;
}

/* Add a pointer when hovering over the thumbnail images */
.cursor {
  cursor: pointer;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

/* Number text (1/3 etc) */
.image-index-text {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
  background-color: hsla(160, 100%, 37%, 0.2);
}

/* Container for image text */
.caption-container {
  text-align: center;
  background-color: #222;
  padding: 2px 16px;
  color: white;
}

.preview-row:after {
  content: '';
  display: table;
  clear: both;
}

/* Six columns side by side */
.preview-item {
  display: inline-flex;
  width: 20%;
  padding: 5px;
  margin: 5px;
  border: 1px solid white;
}

.preview-item img {
  max-height: 60px;
  height: auto;
  margin: 0 auto;
}

/* Add a transparency effect for thumnbail images */
.demo {
  opacity: 0.2;
}

.active,
.demo:hover {
  opacity: 1;
}

/* star rating */
.checked {
  color: orange;
}

/* price */
.price {
  font-size: 2em;
}

.price .original {
  font-size: 0.7em;
  text-decoration: line-through;
}

.spinner {
  margin: 2em auto;
}

.btn {
  border: none;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 12px;
  margin: 5px;
}

.edit-item-button {
  background-color: #ff9800;
}

.edit-item-button:hover {
  background-color: #e68a00;
}

.delete-item-button {
  background-color: #f44336;
}

.delete-item-button:hover {
  background-color: #da190b;
}
</style>
