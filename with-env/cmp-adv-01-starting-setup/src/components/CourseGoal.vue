<script setup lang="ts">
import { ref } from 'vue';

const goals = ref(['Finish the course', 'Learn Vue']);
</script>

<template>
  <ul>
    <li v-for="(item, index) in goals" :key="item">
      <slot :item="item" :index="index"></slot>
    </li>
  </ul>
</template>
