<script setup lang="ts">
import BaseBadge from './BaseBadge.vue';
import BaseCard from './BaseCard.vue';

defineProps<{
  fullName: string;
  infoText: string;
  role: string;
}>();
</script>

<template>
  <section>
    <BaseCard> 
      <template v-slot:header>
        <h3>{{ fullName }}</h3>
        <BaseBadge :type="role" :caption="role.toUpperCase()"></BaseBadge>
      </template>
      <p>{{ infoText }}</p>
    </BaseCard>
  </section>
</template>
