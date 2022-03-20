interface HAConfig {
  api: {
    baseUrl: string;
    token: string;
  };
}

interface TGConfig {
  api: {
    token: string;
  };
  permitUsers: number[];
}

export interface Config {
  homeassistant: HAConfig;
  tg: TGConfig;
}

export const config: Config = {
  homeassistant: {
    api: {
      baseUrl: process.env.HA_API_BASEURL ?? '',
      token: process.env.HA_API_TOKEN ?? ''
    }
  },
  tg: {
    api: {
      token: process.env.TG_API_TOKEN ?? '',
    },
    permitUsers: JSON.parse(process.env.TG_PERMIT_USERS ?? '[]'),
  },
};
