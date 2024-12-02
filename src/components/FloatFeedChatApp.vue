<template>
  <div>
    <FloatContainer
      title="Header"
      color-title="#d4d4d4"
      avatar="https://placehold.jp/30/336633/ffffff/64x64.png?text=MV"
      height="90vh"
      width="70vw"
    >
      <FeedLayout>
        <template #default>
          <chat-wrapper
            :is-open-chat-panel="isOpenChatPanel"
            :is-selected-chat="!!selectedChat"
          >
            <template #default>
              <ChatInfo
                :chat="selectedChat"
                @open-panel="isOpenChatPanel = !isOpenChatPanel"
              />
              <Feed
                :objects="messages"
                @message-action="messageAction"
                @load-more="loadMore"
              />
              <ChatInput
                :enable-emoji="true"
                :channels="channels"
                @send="addMessage"
              />
            </template>
          </chat-wrapper>
        </template>
      </FeedLayout>
    </FloatContainer>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

import {
  ChatInfo,
  ChatInput,
  Feed,
  FloatContainer,
  FeedLayout,
  ChatWrapper
} from "@mobilon-dev/chotto";

import { useChatsStore } from "../stores/chatsStore";
import { transformToFeed } from "../transform/transformToFeed";


// Define props
const props = defineProps({
  authProvider: {
    type: Object,
    required: true,
  },
  dataProvider: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
});

const chatsStore = useChatsStore();

// Reactive data
const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});
const channels = ref([]);

const isOpenChatPanel = ref(false);

const messageAction = (data) => {
  console.log("message action", data);
};

const loadMore = () => {
  // do load more messages to feed
  console.log("load more");
};

const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    const messages = props.dataProvider.getFeed(selectedChat.value.chatId);
    const messages3 = transformToFeed(messages);
    return messages3;
  } else {
    return [];
  }

};

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище

  props.dataProvider.addMessage({
    text: message.text,
    type: message.type,
    chatId: selectedChat.value.chatId,
    direction: "outgoing",
    timestamp: "1727112546",
  });
  messages.value = getFeedObjects(); // Обновление сообщений
};

onMounted(() => {
  // console.log('mounted')
  userProfile.value = props.authProvider.getUserProfile(props.index);
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  selectedChat.value = chatsStore.chats[props.index]
  messages.value = getFeedObjects()
  console.log(userProfile.value, chatsStore.chats[props.index])
});
</script>
