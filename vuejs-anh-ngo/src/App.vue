<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

import { useProductStore } from './stores/products';
import { useUserStore } from './stores/user';

const router = useRouter();

// --- DATA ---
const userStore = useUserStore();
const productStore = useProductStore();
const isLoggedIn = computed(() => {
  return !!userStore.userData.id;
});

// --- METHODS ---
const handleLogout = () => {
  userStore.clearUserData();
  productStore.clearProductData();
  router.push('/login');
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="48"
      height="48"
    />

    <div class="wrapper">
      <nav>
        <div id="left-nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/chat-client"
            >Chat Client</RouterLink
          >
          <RouterLink v-if="isLoggedIn" to="/product-list">Product</RouterLink>
        </div>
        <div id="right-nav">
          <RouterLink v-if="!isLoggedIn" to="/login">
            <span> Login </span>
          </RouterLink>
          <span v-else id="logout-button" @click="handleLogout">Logout</span>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
#right-nav {
  margin-left: auto;
}

#logout-button {
  cursor: pointer;
  color: hsla(160, 100%, 37%, 1);
  margin: 0 1em;
}
.logo {
  display: block;
  margin: 1rem;
}
.wrapper {
  width: 100%;
}
header {
  align-items: center;
  display: flex;
  line-height: 1.5;
  max-height: 100vh;
  border-bottom: 1px solid grey;
}
nav {
  display: flex;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
}
nav a {
  border-left: 1px solid var(--color-border);
  display: inline-block;
  padding: 0 1rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a:first-of-type {
  border: 0;
}

main {
  padding: 2rem;
  padding-top: 0;
}
</style>
