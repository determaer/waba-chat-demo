export const chats = [
  {
    chatId: 1, name: "Юрий",
    avatar: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
    countUnread: 102,
    lastMessage: 'test',
    'lastActivity.time': 'час назад',         // читаемый формат - для пользователей
    'lastActivity.timestamp': '1727001759',   // для сортировки
    isFixedBottom: false,
    status: "#767676",
    'lastMessage.status': 'read',
    actions: [
      { action: 'add', title: 'добавить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=add' },
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=del' },
    ],
    typing: false,
    metadata: '',    // фильтр работает по name и данным в metadata
  },
  {
    chatId: 2, name: "Василий",
    countUnread: 0, isFixedTop: true,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727027359',
    'lastMessage.status': 'received',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    ],
    typing: false,
    lastMessage: 'test',
    metadata: '',
  },
  {
    chatId: 3, name: "Алексей",
    countUnread: 0, isFixedBottom: true,
    'lastMessage.status': 'se',
    'lastActivity.timestamp': '1727027359',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    ],
    typing: false,
    lastMessage: 'test',
    metadata: '',
  },
];
