import type { IState } from '../../homeassistant/types';

export const findCurrentState = (deviceClass: string, states: IState[]): IState | undefined => {
  if (!deviceClass.length || !states.length) return;

  return states.find(state => state.attributes.device_class === deviceClass);
};

export const formatSensorValue = (state: IState): string => {
  return `${state.state}${state.attributes.unit_of_measurement}`;
};
