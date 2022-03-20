export interface IClient {
  getSensorState: (sensorType: string) => Promise<IState | undefined>;
  getSensorValue: (sensorType: string) => Promise<string | undefined>;
}

export interface IBasicStateAttributes {
  'device_class': string;
  'friendly_name': string;
  'unit_of_measurement': string;
}

export interface IStateContext {
  id: string;
  'parent_id': string | null;
  'user_id': string | null;
}

export interface IState {
  attributes: IBasicStateAttributes; // TODO: change for all type of entities
  context: IStateContext;
  'entity_id': string,
  'last_changed': string,
  'last_updated': string;
  state: string;
}

export interface ISensorValue {
  value: string;
  updatedAt: Date;
}
