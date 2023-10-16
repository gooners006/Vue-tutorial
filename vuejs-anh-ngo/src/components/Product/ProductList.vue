<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { onMounted, ref, watch, watchEffect } from 'vue';

import { getAllProduct } from '@/services/modules/ProductService';

import { useProductStore } from '../../stores/products';
import TheLoader from '../TheLoader.vue';
import ListCard from './ListCard.vue';
import ListPagination from './ListPagination.vue';
import PageSizeSelector from './PageSizeSelector.vue';
import ProductForm from './ProductForm.vue';

const pageSizeOptions = [5, 10, 15, 20];
// --- DATA ---
const search = ref('');
const pageSize = ref(pageSizeOptions[0]);
const currentPage = ref(1);
const currentPageOptions = ref();
const isLoading = ref(true);
const errorMessage = ref('');
const totalCount = ref(0);
const isSearching = ref(false);
const isOpeningForm = ref(false);

const productStore = useProductStore();

// --- METHODS ---
const selectPage = (page: number) => {
  currentPage.value = page;
};

const changePageSize = (event: Event) => {
  pageSize.value = Number((event.target as HTMLSelectElement).value);
};

const handleOnKeyDown = () => {
  if (!isSearching.value) {
    isSearching.value = true;
  }
};
const handleSearch = useDebounceFn((event) => {
  search.value = event.target.value;
}, 500);

const toggleForm = (status: boolean) => {
  isOpeningForm.value = status;
};

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const { data, count } = await getAllProduct({
      _page: currentPage.value,
      _limit: pageSize.value,
      search: search.value,
    });
    productStore.setProductData(data);
    totalCount.value = count;
    isLoading.value = false;
    isSearching.value = false;
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
onMounted(fetchProducts);

watch(pageSize, () => {
  currentPage.value = 1;
});

watch([pageSize, currentPage, search], () => {
  fetchProducts();
});

watchEffect(() => {
  const totalPage =
    Math.floor(totalCount.value / pageSize.value) +
    (totalCount.value % pageSize.value === 0 ? 0 : 1);
  const newPageOptions = [...Array(totalPage).keys()].map((i) => i + 1);
  currentPageOptions.value = newPageOptions;

  if (!newPageOptions.includes(currentPage.value)) {
    currentPage.value = 1;
  }
});
</script>

<template>
  <TheLoader v-if="isLoading" class="spinner" />
  <div v-else class="container">
    <header>
      <h1>Product List</h1>
      <div class="search-container">
        <input
          :value="search"
          @input="handleSearch"
          @keydown="handleOnKeyDown"
          type="text"
          placeholder="Search..."
        />
        <div class="search-spinner-container">
          <TheLoader
            v-if="isSearching"
            class="search-spinner"
            size="18px"
            borderWidth="3px"
            color="#a9a9a9"
            secondaryColor="#04aa6d"
          />
        </div>
      </div>
      <button @click="toggleForm(true)" class="btn add-item-button">
        Add Item
      </button>
    </header>
    <div class="options-container">
      <ListCard
        v-for="product in productStore.productData"
        :key="product.id"
        :product="product"
      />
    </div>

    <div class="list-footer">
      <PageSizeSelector
        :pageSizeOptions="pageSizeOptions"
        :pageSize="pageSize"
        @changePageSize="changePageSize"
      />

      <ListPagination
        :currentPageOptions="currentPageOptions"
        :currentPage="currentPage"
        @selectPage="selectPage"
      />
    </div>
    <ProductForm
      v-if="isOpeningForm"
      @toggleForm="toggleForm"
      @refreshData="fetchProducts"
    />
  </div>
</template>

<style scoped>
header {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
}

header h1 {
  font-weight: bold;
  margin-right: 30px;
}

header input {
  border: none;
  padding: 10px;
  border-radius: 5px;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}

.list-footer {
  display: flex;
  flex-direction: row-reverse;
}

.spinner {
  margin: 2em auto;
}

.search-container {
  position: relative;
}

.search-spinner-container {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
}

header button {
  margin-left: auto;
}

.btn {
  border: none;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 12px;
}

.add-item-button {
  background-color: #04aa6d;
}

.add-item-button:hover {
  background-color: #46a049;
}
</style>
