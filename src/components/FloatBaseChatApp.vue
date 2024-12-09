<template>
  <div>
    <button v-if="!userProfile.online" @mousedown="onlineUser">
      Открыть чат
    </button>
    <FloatContainer
      v-else
      :title="userProfile ? userProfile.name : ''"
      color-title="#d4d4d4"
      :avatar="userProfile ? userProfile.avatar : ''"
      height="700px"
      width="900px"
      @close-window="offlineUser"
    >
      <BaseLayout>

        <template #first-col>
          <UserProfile :user="userProfile" />
          <ChatList
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
          />
          <ThemeMode
            :themes="themes"
            :show="true"
          />
        </template>

        <template #second-col>
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
                :is-scroll-to-bottom-on-update-objects-enabled="isScrollToBottomOnUpdateObjectsEnabled"
                :typing="selectedChat.typing"
                />
              <ChatInput
                @send="addMessage"
                @typing="sendTyping"
              >
                <template #buttons>
                  <FileUploader
                    :filebump-url="filebumpUrl"
                  />
                  <ButtonEmojiPicker 
                    :mode="'hover'"
                  />
                  <ButtonTemplateSelector
                    :templates="templates.templates"
                    :mode="'click'"
                  />
                  <ChannelSelector 
                    :channels="channels"
                    :mode="'hover'"
                  />
                </template>
              </ChatInput>
            </template>

            <template #chatpanel>
              <ChatPanel
                v-if="isOpenChatPanel"
                :title="selectedChat.name"
                @close-panel="isOpenChatPanel = !isOpenChatPanel"
              >
                <template #content>
                  test
                </template>
              </ChatPanel>
            </template>
          </chat-wrapper>
        </template>
      </BaseLayout>
    </FloatContainer>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

import {
  ChatInfo,
  ChatInput,
  ChatList,
  Feed,
  UserProfile,
  ChatPanel,
  FloatContainer,
  ChatWrapper,
  formatTimestamp,
  insertDaySeparators,
  playNotificationAudio,
  sortByTimestamp,
  BaseLayout,
  FileUploader,
  ButtonEmojiPicker,
  ButtonTemplateSelector,
  ChannelSelector,
  ThemeMode,
} from "@mobilon-dev/chotto";

import { useChatsStore } from "../stores/chatsStore";
import { transformToFeed } from "../transform/transformToFeed";
import { useNewMessage } from "../useNewMessage";

const {newMessage} = useNewMessage()

watch(
  () => newMessage.value,
  () => {
    messages.value = getFeedObjects();
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

const themes = [
  {
    code: "light",
    name: "Light",
  },
  {
    code: "dark",
    name: "Dark",
    
  },
  {
    code: "green",
    name: "Green",
  },
  {
    code: "diamond",
    name: "Diamond",
  },
];

const chatsStore = useChatsStore();

// Reactive data
const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});
const channels = ref([]);
const templates = ref([]);
const isOpenChatPanel = ref(false);
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);
const filebumpUrl = ref('https://filebump2.services.mobilon.ru');

const offlineUser = () => {
  userProfile.value.online = false
  userProfile.value.status = 'gray'
  props.authProvider.setUserProfileOnline(props.index, false);
  chatsStore.setStatus(selectedChat.value.chatId, 'gray')
}

const onlineUser = () => {
  userProfile.value.online = true
  userProfile.value.status = 'lightgreen'
  props.authProvider.setUserProfileOnline(props.index, true);
  chatsStore.setStatus(selectedChat.value.chatId, 'lightgreen')
}


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
    isScrollToBottomOnUpdateObjectsEnabled.value = true;
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
    timestamp: Date.now() / 1000,
  });
  messages.value = getFeedObjects(); // Обновление сообщений
  chatsStore.setLastStatus(selectedChat.value.chatId,'read')
  newMessage.value = !newMessage.value
};

let timer;
const sendTyping = () => {
  chatsStore.setTypingIn(selectedChat.value.chatId, true)
  clearTimeout(timer)
  timer = setTimeout(() => {
    chatsStore.setTypingIn(selectedChat.value.chatId, false)
  },5000)
}

const selectChat = (chat) => {
  newMessage.value = !newMessage.value
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  chatsStore.readMessages(chat.chatId, props.index + 1)
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе контакта
};

onMounted(() => {
  // console.log('mounted')
  userProfile.value = props.authProvider.getUserProfile(props.index);
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  templates.value = props.dataProvider.getTemplates()
  console.log(userProfile)
});
</script>
