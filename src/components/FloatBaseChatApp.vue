<template>
  <div>
    <FloatContainer
      :title="userProfile ? userProfile.name : ''"
      color-title="#d4d4d4"
      :avatar="userProfile ? userProfile.avatar : ''"
      height="700px"
      width="1000px"
    >
      <BaseLayout>

        <template #first-col>
          <UserProfile :user="userProfile" />
          <ChatList
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
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
} from "@mobilon-dev/chotto";

import { useChatsStore } from "../stores/chatsStore";
import { transformToFeed } from "../transform/transformToFeed";
import { useNewMessage } from "../useNewmessage";

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
    timestamp: Date.now() / 1000,
  });
  messages.value = getFeedObjects(); // Обновление сообщений
  newMessage.value = !newMessage.value
};

const sendTyping = () => {

}

const selectChat = (chat) => {
  selectedChat.value = chat;
  //chatsStore.setUnreadCounter(chat.chatId, 0);
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
