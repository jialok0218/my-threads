// src/config/apiClient.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '../constants/env';

const options: AxiosRequestConfig = {
  baseURL: API_URL,
  withCredentials: true,
};

const API = axios.create(options);

// Interceptor for handling responses
API.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const { status, data } = error.response || {};
    return Promise.reject({ status, ...data });
  }
);

export default API;
