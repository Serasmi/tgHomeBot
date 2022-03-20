import { format } from 'date-fns';
import TelegramBot from 'node-telegram-bot-api';

import { config } from '../config';

import type { ISensorValue } from '../homeassistant/types';

export const generateSensorMessage = (sensorName: string, sensorValue: ISensorValue | undefined): string => {
  if (!sensorValue) return `Error! Sensor ${sensorName} was not found.`;

  const formattedDate = format(sensorValue.updatedAt, 'yyyy-MM-dd HH:mm');

  return `${sensorName} is ${sensorValue.value}.\nLast updated at ${formattedDate}`;
};

export const isUserPermitted = (id: number | undefined): boolean => Boolean(id && config.tg.permitUsers.includes(id));

type MessageHandler = (msg: TelegramBot.Message, ...restParams: any) => void;

// TODO: add promise as clb ability
export const useAuth = (clb: MessageHandler) => (msg: TelegramBot.Message, ...restParams: any) => {
  if (!isUserPermitted(msg.from?.id)) return;

  clb(msg, ...restParams);
};
