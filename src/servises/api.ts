import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';

const baseURL = 'https://14.design.htmlacademy.pro/six-cities';
const requestTimeout = 5000;

export const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: requestTimeout
  });

  api.interceptors.request.use(
    (config : InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers){
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  return api;
};

