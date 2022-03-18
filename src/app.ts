import 'dotenv/config';
import TelegramBot, { KeyboardButton } from 'node-telegram-bot-api';

import { config } from './config';
import { HAButton } from './constants';
import { isUserPermitted, useAuth } from './utils';

// replace the value below with the Telegram token you receive from @BotFather
// TODO: remove token from here
const token = config.tg.api.token;

export const makeBot = () => {
    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, {polling: true});

    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', useAuth((msg) => {
        if (!isUserPermitted(msg.from?.id)) return;
        
        const chatId = msg.chat.id;

        // console.log(msg.from?.id)

        // send a message to the chat acknowledging receipt of their message
        // bot.sendMessage(chatId, 'Received your message');

        if (msg.text === HAButton.humidity) {
            bot.sendMessage(chatId, `You have asked for ${HAButton.humidity}`);
        }
    }));

    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, useAuth((msg, match) => {
        if (!isUserPermitted(msg.from?.id)) return;
        
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        if (!match) return;

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    }));

    bot.onText(/\/start/, useAuth((msg) => {
        if (!isUserPermitted(msg.from?.id)) return;

        const humidityKeyboard: KeyboardButton = {
            text: HAButton.humidity
        }

        bot.sendMessage(msg.chat.id, "What do you want?", {
            "reply_markup": {
                keyboard: [[humidityKeyboard]],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    }));
}