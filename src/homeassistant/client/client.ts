import { service as apiService } from '../service';
import { findCurrentState, formatSensorValue } from './utils';

import type { ISensorValue, IState } from '../../homeassistant/types';

export interface Client {
  getSensorState: (sensorType: string) => Promise<IState | undefined>;
  getSensorValue: (sensorType: string) => Promise<ISensorValue | undefined>;
}

export const client = (): Client => {
  const service = apiService();

  const getSensorState: Client['getSensorState'] = async (sensorType) => {
    const states = await service.getStates();

    return findCurrentState(sensorType, states);
  };

  const getSensorValue: Client['getSensorValue'] = async (sensorType) => {
    const sensorState = await getSensorState(sensorType);

    if (!sensorState) return;

    const value = formatSensorValue(sensorState);

    return { value, updatedAt: new Date(sensorState.last_updated)};
  };

  return {
    getSensorState,
    getSensorValue
  };
};
