<script setup lang="ts">
import { ref } from 'vue';

import ErrorAlert from './ErrorAlert.vue';

const inputRef = ref();
const isValidInput = ref(true);

const setGoal = () => {
  const enteredValue = inputRef.value.value;
  if (!enteredValue) {
    isValidInput.value = false;
  }
};

const closeAlert = () => {
  isValidInput.value = true;
};
</script>

<template>
  <h2>Manage Goals</h2>
  <input type="text" ref="inputRef" />
  <button @click="setGoal">Set Goal</button>
  <teleport to="body">
    <ErrorAlert v-if="!isValidInput">
      <h2>Invalid Input!</h2>
      <p>Please enter something</p>
      <button @click="closeAlert">Okay!</button>
    </ErrorAlert>
  </teleport>
</template>
