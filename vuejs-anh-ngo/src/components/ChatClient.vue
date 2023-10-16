<script setup lang="ts">
import { ref } from 'vue';

// --- DATA ---
const socket = new WebSocket('ws://localhost:3000');
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  messages.value.push({
    message: data.message,
    type: 1,
    user: data.user,
  });
};

const ready = ref(false);
const username = ref('');
const messages = ref<{ user: string; type: number; message: string }[]>([]);
const newMessage = ref(null);

// --- METHODS ---
const addUser = () => {
  ready.value = true;
};

const send = () => {
  const messageData = {
    message: newMessage.value ?? '',
    type: 0,
    user: username.value,
  };
  // Send the message data to the server using WebSockets
  socket.send(JSON.stringify(messageData));

  messages.value.push(messageData);

  newMessage.value = null;
};
</script>

<template>
  <div class="container">
    <div class="col-lg-6 offset-lg-3">
      <div v-if="!ready">
        <h4>Enter your username</h4>
        <form @submit.prevent="addUser">
          <div class="form-group row">
            <input
              type="text"
              class="form-control col-9"
              v-model="username"
              placeholder="Enter username here"
            />
            <input
              type="submit"
              value="Join"
              class="btn btn-sm btn-info ml-1"
            />
          </div>
        </form>
      </div>
      <h2 v-else>{{ username }}</h2>
      <div class="card bg-success" v-if="ready">
        <div class="card-header text-white">
          <h4>My Chat App</h4>
        </div>
        <ul class="list-group list-group-flush text-right">
          <li class="list-group-item" v-for="(message, i) in messages" :key="i">
            <span
              :class="{
                'float-left text-secondary': message.type === 1,
                'text-primary': message.type !== 1,
              }"
            >
              {{ message.type === 1 ? `${message.user}: ` : ''
              }}{{ message.message }}
            </span>
          </li>
        </ul>

        <div class="card-body">
          <form @submit.prevent="send">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="newMessage"
                placeholder="Enter message here"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
