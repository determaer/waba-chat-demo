<template>
    <FloatContainer
    :title="userProfile ? userProfile.name : ''"
      color-title="#d4d4d4"
      :avatar="userProfile ? userProfile.avatar : ''"
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
import { useNewMessage } from "../useNewMessage";

const {newMessage} = useNewMessage()

watch(
  () => newMessage.value,
  () => {
    if (messages.value.length != getFeedObjects().length){
      messages.value = getFeedObjects();
    }
  },
)

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
const isScrollToBottomOnUpdateObjectsEnabled = ref(true);
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
    const messages3 = transformToFeed(messages, props.index);
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
    senderId: props.index + 1,
    timestamp: Date.now()/ 1000,
    status: 'received',
  });
  chatsStore.setLastMessage(selectedChat.value.chatId,message.text)
  chatsStore.increaseUnreadCounter(selectedChat.value.chatId, 1)
  messages.value = getFeedObjects(); // Обновление сообщений
  newMessage.value = !newMessage.value
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
