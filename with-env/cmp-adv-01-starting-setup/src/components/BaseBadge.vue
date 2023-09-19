<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  type: string;
  caption: string;
}>();

const classes = computed(() => {
  let value = '';
  switch (props.type) {
    case 'admin':
      value = 'badge--admin';
      break;

    case 'author':
      value = 'badge--author';
      break;

    default:
      break;
  }
  return value;
});
</script>

<template>
  <span class="badge" :class="classes">{{ caption }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background-color: #ccc;
  color: #2e2e2e;
}

.badge--admin {
  background-color: #810036;
  color: white;
}

.badge--author {
  background-color: #002c8a;
  color: white;
}
</style>
