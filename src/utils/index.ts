import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config';

export const isUserPermitted = (id: number | undefined): boolean => Boolean(id && config.tg.permitUsers.includes(id));

type MessageHandler = (msg: TelegramBot.Message, ...restParams: any) => void;

// TODO: add promise as clb ability
export const useAuth = (clb: MessageHandler) => (msg: TelegramBot.Message, ...restParams: any) => {
  if (!isUserPermitted(msg.from?.id)) return;

  clb(msg, ...restParams);
};
