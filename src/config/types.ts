
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

export interface IConfig {
  homeassistant: HAConfig;
  tg: TGConfig;
}
