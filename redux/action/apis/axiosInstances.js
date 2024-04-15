
// import * as Types from "../../constants/actionTypes";
import axios from 'axios'
// Create an instance of axios
export const mainApiInstance = axios.create({
  baseURL: "http://localhost:3000"
});

// Add a request interceptor
mainApiInstance.interceptors.request.use(
  config => {
    
    return config;
  },
  error => {
    
    return Promise.reject(error);
  }
);

// Add a response interceptor
mainApiInstance.interceptors.response.use(
  response => {
    
    console.log('Response:', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);


