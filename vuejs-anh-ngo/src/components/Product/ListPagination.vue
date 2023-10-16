<script setup lang="ts">
const { currentPage, currentPageOptions } = defineProps<{
  currentPageOptions: number[];
  currentPage: number;
}>();
const emit = defineEmits<{
  (event: 'selectPage', page: number): void;
}>();
</script>

<template>
  <div class="pagination">
    <span
      @click="emit('selectPage', currentPage - 1)"
      :class="{
        disabled: currentPage === currentPageOptions[0],
      }"
    >
      &laquo;
    </span>
    <span
      v-for="item in currentPageOptions"
      :key="item"
      @click="emit('selectPage', item)"
      :class="{ active: item === currentPage }"
    >
      {{ item }}
    </span>
    <span
      @click="emit('selectPage', currentPage + 1)"
      :class="{
        disabled:
          currentPage === currentPageOptions[currentPageOptions.length - 1],
      }"
      >&raquo;
    </span>
  </div>
</template>

<style scoped>
/* pagination style */
.pagination span {
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
  color: hsla(160, 100%, 37%, 1);
}

.pagination span.active {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}

.pagination span:hover:not(.active) {
  background-color: #ddd;
}

.pagination span.disabled {
  color: gray;
  pointer-events: none;
}
</style>
