export const messages = [
/**Chat 1 */
  {
    senderId:1,chatId: 1, type: "message.call",
    callDuration: "18 мин", isMissedCall: false, timestamp: '1727027959',
  },
  {
    senderId:1, chatId: 1, type: "message.text", text: "Привет!", status: 'read', timestamp: '1727027959', subText: 'test test',
    actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    senderId:4,chatId: 1, type: "message.text", text: "Привет! Сообщение с просмотрами",
    status: 'received', timestamp: '1727027959',
    actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    senderId:4,chatId: 1, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", timestamp: '1727027959',
    alt: "Example Image",
    views: 1667,
    status: 'received', actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 1, messageId: 1,
    timestamp: 1731411505,
    type: "message.system", text: 'Освободите место на вашем устройстве или измените настройки кэширования.',
  },
/**Chat 2 */
  {
    senderId:2,chatId: 2, type: "message.video", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", status: 'read', timestamp: '1727027959',
    actions: [
      { action: 'edit', title: 'изменить', icon: 'fa-edit' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    senderId:2,chatId: 2, type: "message.file", url: "https://axiomabio.com/pdf/test.pdf", filename: "Документ.pdf",
    status: 'received', timestamp: '1727027959', actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }]
  },
  { senderId:2,chatId: 2, type: "message.text", text: "Привет!", status: 'read', timestamp: '1727027959' },
  {
    senderId:2,chatId: 2, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", status: 'received', subText: '89829445678', timestamp: '1727027959',
    actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }]
  },
  {
    senderId:4,chatId: 2, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", status: 'received', subText: '89829445678', timestamp: '1727027959',
    actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }]
  },
  {
    senderId:4,chatId: 2, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
     subText: '89829445678', timestamp: '1726743559',
  },
/**Chat 3 */
  {
    senderId:3,chatId: 3, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", status: 'read', timestamp: '1727027959'
  },
  {
    senderId:4,chatId: 3, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    timestamp: '1726743559',
  },
  {
    senderId:3,chatId: 3, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", status: 'read', timestamp: '1727027959'
  },
  {
    senderId:4,chatId: 3, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    timestamp: '1726743559',
  },
];
