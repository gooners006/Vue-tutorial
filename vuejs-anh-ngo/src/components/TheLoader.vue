<script setup lang="ts">
const { size, borderWidth, color, secondaryColor } = defineProps<{
  size?: string;
  borderWidth?: string;
  color?: string;
  secondaryColor?: string;
}>();

const style = {
  size: size || '120px',
  borderWidth: borderWidth || '16px',
  color: color || '#04aa6d',
  secondaryColor: secondaryColor || '#f3f3f3',
};
</script>

<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  border-width: v-bind('style.borderWidth');
  border-style: solid;
  border-color: v-bind('style.secondaryColor');
  border-radius: 50%;
  border-top-color: v-bind('style.color');
  width: v-bind('style.size');
  height: v-bind('style.size');
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
