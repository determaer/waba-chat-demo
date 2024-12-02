<script setup>
 
 import FloatFeedChatApp from './components/FloatFeedChatApp.vue';
import {
  messages, chats, channels,
  userProfiles, users, templates
} from './data';

// Mock data
const data3 = {
  messages,
  chats,
  channels,
  userProfiles,
  users,
  templates
};

// Define the auth provider
const authProvider = {
  getUserProfile(index) { return data3.userProfiles[index] }
};

// Define the data provider
const dataProvider = {
  setAuth(auth) {
    console.log('auth', auth);
  },
  getFeed(chatId) {
    return data3.messages.filter(m => m.chatId === chatId);
  },
  getChannels() {
    return data3.channels;
  },
  getTemplates() {
    return data3.templates;
  },
  getChats() {
    return data3.chats;
  },
  getUsers() {
    return data3.users;
  },
  addMessage(message) {
    data3.messages.push(message);
    console.log("Добавлено новое сообщение:", message);
  },
};
</script>

<template>
  <div class="container">
    <FloatFeedChatApp
      :auth-provider="authProvider"
      :data-provider="dataProvider"
      :index="0"
    />
    <FloatFeedChatApp
      :auth-provider="authProvider"
      :data-provider="dataProvider"
      :index="1"
    />
    <FloatFeedChatApp
      :auth-provider="authProvider"
      :data-provider="dataProvider"
      :index="2"
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin: 30px auto;
}
</style>
