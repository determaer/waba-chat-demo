<template>
  <div>
    <FloatContainer
      :title="selectedChat ? selectedChat.name : ''"
      color-title="#d4d4d4"
      :avatar="selectedChat ? selectedChat.avatar : ''"
      height="500px"
      width="500px"
    >
      <FeedLayout>
        <template #default>
          <chat-wrapper
            :is-open-chat-panel="isOpenChatPanel"
            :is-selected-chat="!!selectedChat"
          >
            <template #default>
              <Feed
                :objects="messages"
                :is-scroll-to-bottom-on-update-objects-enabled="isScrollToBottomOnUpdateObjectsEnabled"
                @message-action="messageAction"
                @load-more="loadMore"
                
              />
              <ChatInput
                @send="addMessage"
              >
                <template #buttons>
                  <FileUploader
                    :filebump-url="filebumpUrl"
                  />
                  <ButtonEmojiPicker 
                    :mode="'hover'"
                  />
                </template>
              </ChatInput>
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
  ChatInput,
  Feed,
  FloatContainer,
  FeedLayout,
  FileUploader,
  ButtonEmojiPicker,
  ChatWrapper,
  playNotificationAudio,
  formatTimestamp,
} from "@mobilon-dev/chotto";

import { useChatsStore } from "../stores/chatsStore";
import { transformToFeed } from "../transform/transformToFeed";

//import '@mobilon-dev/chotto/style.css'

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
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);
const filebumpUrl = ref('https://filebump2.services.mobilon.ru');
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
