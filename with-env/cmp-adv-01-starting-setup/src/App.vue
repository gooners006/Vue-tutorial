<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import BadgeList from './components/BadgeList.vue';
import UserInfo from './components/UserInfo.vue';
import CourseGoal from './components/CourseGoal.vue';
import ActiveGoals from './components/ActiveGoals.vue';
import ManageGoals from './components/ManageGoals.vue';
import { reactive, ref } from 'vue';
import type { Component } from 'vue';
const activeUser = reactive({
  name: 'Maximilian Schwarzmüller',
  description: 'Site owner and admin',
  role: 'admin',
});

const selectedComponent = ref();

const setSelectedComponents = (component: Component) => {
  selectedComponent.value = component;
};
</script>

<template>
  <TheHeader></TheHeader>
  <BadgeList></BadgeList>
  <UserInfo
    :full-name="activeUser.name"
    :info-text="activeUser.description"
    :role="activeUser.role"
  ></UserInfo>
  <CourseGoal>
    <template v-slot:default="slotProps">
      <h2>
        {{ slotProps.index }}
        {{ slotProps.item }}
      </h2>
    </template>
  </CourseGoal>
  <button @click="setSelectedComponents(ActiveGoals)">Active Goals</button>
  <button @click="setSelectedComponents(ManageGoals)">Manage Goals</button>
  <keep-alive>
    <component :is="selectedComponent"></component>
  </keep-alive>
</template>

<style scoped>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
