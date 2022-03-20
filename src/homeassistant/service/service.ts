import _axios, { AxiosRequestConfig } from 'axios';
import { HTTPMethod } from '../../constants';
import { config } from '../../config';

import type { IState } from '../../homeassistant/types';

export interface Service {
  getStates: () => Promise<IState[]>
}

export const service = (): Service => {
  const baseURL = `${config.homeassistant.api.baseUrl}/api`;
  const token = config.homeassistant.api.token;

  const axios = _axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  const fetch = async <T = unknown>(url: string, options: AxiosRequestConfig): Promise<T> => {
    const { data } = await axios({
      url,
      ...options
    });

    return data as T;
  };

  return {
    getStates: () => {
      return fetch('/states', {
        method: HTTPMethod.get
      });
    }
  };
};
