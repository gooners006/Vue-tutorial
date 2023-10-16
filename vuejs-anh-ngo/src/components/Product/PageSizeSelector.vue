<script setup lang="ts">
const { pageSize, pageSizeOptions } = defineProps<{
  pageSizeOptions: number[];
  pageSize: number;
}>();
const emit = defineEmits<{
  (event: 'changePageSize', e: Event): void;
}>();
</script>

<template>
  <div class="select">
    <select
      name="pageSize"
      id="pageSize"
      :value="pageSize"
      @change="emit('changePageSize', $event)"
    >
      <option
        v-for="pageSizeOption in pageSizeOptions"
        :key="pageSizeOption"
        :value="pageSizeOption"
      >
        {{ pageSizeOption }}
      </option>
    </select>
  </div>
</template>

<style scoped>
/* <select> styles */
select {
  /* Reset Select */
  appearance: none;
  outline: 10px red;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: hsla(160, 100%, 37%, 1);
  background-image: none;
  cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 6em;
  height: 3em;
  border-radius: 0.25em;
  overflow: hidden;
}
/* Arrow */
.select::after {
  content: '\25BC';
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  background-color: hsla(160, 100%, 37%, 1);
  transition: 0.25s all ease;
  pointer-events: none;
  transform: translate(-60%, 50%);
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}
</style>
