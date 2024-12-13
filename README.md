# Demo chat app with WABA templates 

This app shows the ability to send messages in chat through different channels: like in this example - WABA and SMS. Contains 3 linked chat windows, providing 2 dialogs - one of them is not started yet. 

In all cases we should firstly choose the channel, the conversation algorithm depends on this chose.
If it is WABA channel:
- dialog is not started - there is a need to select template, complete the variables and upload file if necessary. At this moment input text area, file inner uploader and emoji picker are disabled.
- dialog already exist - any input item can be used.
If it is SMS channel, then in both cases template selector is disabled, it is possible to use any other input item.

Templates can contains such What's app data entities like variables, attached file, quick reply buttons. For showing quick reply buttons in messages they are replacing by | [ QUICK_REPLY_BUTTON ].

## Dependencies:
- Vue
- Vite
- Pinia
- [mobilon-dev/chotto](https://github.com/mobilon-dev/chotto) library

## Screenshot

![](images/all.jpg)

## Github pages

[waba chat app demo](https://determaer.github.io/waba-chat-demo/)

## Local deployment

After cloning repo to local machine type this in CLI:

` npm install `

` npm run dev `
