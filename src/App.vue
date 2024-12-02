<script setup>
 
 import FloatFeedChatApp from './components/FloatFeedChatApp.vue';
 import FloatBaseChatApp from './components/FloatBaseChatApp.vue';
import {
  messages, chats, channels,
  userProfiles, templates
} from './data';

// Mock data
const data3 = {
  messages,
  chats,
  channels,
  userProfiles,
  templates
};

// Define the auth provider
const authProvider = {
  getUserProfile(index) { console.log(data3.userProfiles[3], index); return data3.userProfiles[index] }
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
    <FloatBaseChatApp
      :auth-provider="authProvider"
      :data-provider="dataProvider"
      :index="3"
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 2000px;
  margin: 30px auto;
}
</style>
