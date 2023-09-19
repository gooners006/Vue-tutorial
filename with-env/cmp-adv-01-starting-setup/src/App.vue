<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import BadgeList from './components/BadgeList.vue';
import UserInfo from './components/UserInfo.vue';
import CourseGoal from './components/CourseGoal.vue';
import { reactive } from 'vue';

const activeUser = reactive({
  name: 'Maximilian Schwarzmüller',
  description: 'Site owner and admin',
  role: 'admin',
});
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
