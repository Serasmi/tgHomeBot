import { service as apiService } from '../service';
import { findCurrentState, formatSensorValue } from './utils';

import type { IState } from '../../homeassistant/types';

export interface Client {
  getSensorState: (sensorType: string) => Promise<IState | undefined>;
  getSensorValue: (sensorType: string) => Promise<string | undefined>;
}

export const client = (): Client => {
  const service = apiService();

  const getSensorState = async (sensorType: string): Promise<IState | undefined> => {
    const states = await service.getStates();

    return findCurrentState(sensorType, states);
  };

  const getSensorValue = async (sensorType: string): Promise<string | undefined> => {
    const sensorState = await getSensorState(sensorType);

    if (!sensorState) return;

    return formatSensorValue(sensorState);
  };

  return {
    getSensorState,
    getSensorValue
  };
};
