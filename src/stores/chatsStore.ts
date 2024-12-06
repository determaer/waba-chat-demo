import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatsStore = defineStore('chats', () => {
  // chatStore должен хранить данные чатов в таком же виде как в компоненте Chat
  const chats: any = ref([])

  function getChatById(chatId: string) {
    return chats.value.find((c: any) => c.chatId === chatId);
  }

  function skipUnreadCounter(chatId: string) {
    const chat = getChatById(chatId);
    if (chat) chat.countUnread = 0;
  }

  function decreaseUnreadCounter(chatId: string, num: number) {
    const chat = getChatById(chatId);
    if (chat) chat.countUnread -= num;
  }

  function increaseUnreadCounter(chatId: string, countUnread: number) {
    const chat = getChatById(chatId);
    if (chat) chat.countUnread += countUnread;
  }

  function setLastMessage(chatId: string, lastMessage: string) {
    const chat = getChatById(chatId);
    if (chat) chat.lastMessage = lastMessage.substring(0, 20);
  }

  function setLastActivityTime(chatId: string, lastActivityTime: string) {
    const chat = getChatById(chatId);
    if (chat) chat['lastActivity.time'] = lastActivityTime;
  }

  function setStatus(chatId: string, statusColor: string) {
    const chat = getChatById(chatId);
    if (chat) chat.status = statusColor;
  }

  function setTyping(chatId: string, typing: Boolean, attrs: Object) {
    const chat = getChatById(chatId);
    if (chat) {
      if (attrs){
        chat.typing = attrs
      }
      else {
        chat.typing = typing;
      }
    }
  }

  function setTypingIn(chatId: string, typing: Boolean, attrs: Object) {
    const chat = getChatById(chatId);
    if (chat) {
      if (attrs){
        chat.typingIn = attrs
      }
      else {
        chat.typingIn = typing;
      }
    }
  }

  function updateChatNewMessage(
    chatId: string,
    countUnread: number,
    lastMessage: string,
    lastActivityTime: string
  ) {
    increaseUnreadCounter(chatId, countUnread);
    setLastMessage(chatId, lastMessage);
    setLastActivityTime(chatId, lastActivityTime);
  }

  return {
    chats,
    increaseUnreadCounter,
    skipUnreadCounter,
    decreaseUnreadCounter,
    setLastMessage,
    setLastActivityTime,
    updateChatNewMessage,
    setStatus,
    getChatById,
    setTyping,
    setTypingIn,
  }
})
