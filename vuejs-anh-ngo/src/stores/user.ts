import { defineStore } from 'pinia';
import { ref } from 'vue';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

export const useUserStore = defineStore('userData', () => {
  const initialUserData = {};
  const initialUser = JSON.parse(
    localStorage.getItem('userData') ?? JSON.stringify(initialUserData),
  );
  // ---STATE---
  const userData = ref(initialUser);

  // ---ACTION---
  const setUserData = (data: User) => {
    userData.value = data;
  };
  const clearUserData = () => {
    userData.value = initialUserData;
  };

  return {
    userData,
    setUserData,
    clearUserData,
  };
});
