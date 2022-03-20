import { envVarsSchema } from './utils/validation';

import type { IConfig } from './types';

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: IConfig = {
  homeassistant: {
    api: {
      baseUrl: envVars.HA_API_BASEURL,
      token: envVars.HA_API_TOKEN
    }
  },
  tg: {
    api: {
      token: envVars.TG_API_TOKEN,
    },
    permitUsers: envVars.TG_PERMIT_USERS,
  },
};

export type { IConfig } from './types';
