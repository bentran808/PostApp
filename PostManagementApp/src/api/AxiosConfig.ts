import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from 'utils/helpers';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.56.1:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const access_token = await getAccessToken();
    config.headers!.Authorization = access_token ? `Bearer ${access_token}` : '';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
