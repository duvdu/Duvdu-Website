
import * as Types from "../../constants/actionTypes";
import axios from 'axios'
// Create an instance of axios
export const mainApiInstance = axios.create({
    baseURL: process.env.main_api
  });
  
  // Add a request interceptor
  mainApiInstance.interceptors.request.use(
    config => {
      // Do something before request is sent, like adding headers
      // For example, you can add authentication headers
      // config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor
  mainApiInstance.interceptors.response.use(
    response => {
      // Do something with response data, like logging
      console.log('Response:', response);
      return response;
    },
    error => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  
  