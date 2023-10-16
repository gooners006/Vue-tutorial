<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { signIn } from '../services/modules/AuthService';
import { useUserStore } from '../stores/user';
import ErrorMessage from './ErrorMessage.vue';
import TheLoader from './TheLoader.vue';

const rememberedUser = localStorage.getItem('rememberedUser');
const initialUserData = rememberedUser
  ? JSON.parse(rememberedUser)
  : {
      username: '',
      password: '',
    };
const router = useRouter();
const userStore = useUserStore();

// --- DATA ---
const inputData = reactive(initialUserData);
const errorMessage = ref('');
const isLoggingIn = ref(false);
const isRemembering = ref(!!rememberedUser);

// --- METHODS ---
const handleSubmit = async () => {
  isLoggingIn.value = true;
  try {
    const { data: userData } = await signIn({
      username: inputData.username.trim(),
      password: inputData.password,
    });
    isLoggingIn.value = false;

    userStore.setUserData(userData);
    if (isRemembering.value) {
      localStorage.setItem(
        'rememberedUser',
        JSON.stringify({
          username: userData.username,
        }),
      );
    } else {
      localStorage.removeItem('rememberedUser');
    }
    router.push('/');
  } catch (error) {
    isLoggingIn.value = false;
    if (error instanceof Error) {
      errorMessage.value = (error.cause as { message: string }).message;
    } else {
      errorMessage.value = 'Unknown error';
      throw error;
    }
  }
};

// --- EFFECTS ---
watch(inputData, () => {
  errorMessage.value = '';
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="img-container">
      <img
        src="https://www.w3schools.com/howto/img_avatar2.png"
        alt="Avatar"
        class="avatar"
      />
    </div>
    {{ { username: 'kminchelle', password: '0lelplR' } }}
    <div class="container">
      <label for="username"><b>Username</b></label>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        required
        v-model="inputData.username"
        :class="{ error: errorMessage }"
      />
      <label for="password"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        required
        v-model="inputData.password"
        :class="{ error: errorMessage }"
      />
      <ErrorMessage>{{ errorMessage }}</ErrorMessage>

      <TheLoader v-if="isLoggingIn" class="spinner" />
      <div v-else>
        <button type="submit">Login</button>
        <label>
          <input type="checkbox" name="remember" v-model="isRemembering" />
          Remember me
        </label>
        <span class="password"><a href="#">Forgot your password?</a></span>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  padding: 0 10%;
}
/* Full-width input fields */
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
}

input.error {
  border: 2px solid red;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
}

button:hover {
  opacity: 0.8;
}

/* Center the image and position the close button */
.img-container {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  max-width: 20%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.password {
  float: right;
  padding-top: 16px;
}

.spinner {
  margin: 0 auto;
}
</style>
