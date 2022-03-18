interface TGConfig {
  api: {
    token: string;
  };
  permitUsers: number[];
}

export interface Config {
  tg: TGConfig;
}

export const config: Config = {
  tg: {
    api: {
      token: process.env.TG_API_TOKEN ?? '',
    },
    permitUsers: JSON.parse(process.env.TG_PERMIT_USERS ?? '[]'),
  },
};
