import 'dotenv/config';

import { client as _haClient } from './homeassistant';
import { initBot } from './tg-bot';

const haClient = _haClient();

const initApp = async () => {
  initBot(haClient);
};

initApp();
