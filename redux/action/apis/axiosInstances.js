
// import * as Types from "../../constants/actionTypes";
import axios from 'axios'
let prevdate = Date.now();
// Create an instance of axios
export const mainApiInstance = axios.create({
  baseURL: process.env.BASE_URL || "",
  withCredentials: true
});

// Add a request interceptor
mainApiInstance.interceptors.request.use(
  config => {
    const dateNow = Date.now()
    const timeSinceLastRequest = dateNow - prevdate;

    if (timeSinceLastRequest < 1000) {  // Check if less than 1 second has passed
      // Delay the request to fulfill the 1 second requirement
      return new Promise((resolve) => {
        setTimeout(() => {
          prevdate = Date.now();  // Update prevdate to the current time
          resolve(config);  // Continue with the request configuration
        }, 1000 - timeSinceLastRequest);  // Calculate the remaining time to delay
      });
    }
    prevdate = dateNow;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
mainApiInstance.interceptors.response.use(
  response => {
console.log(response)
    return response;
  },
  async error => {
    if (error.response && error.response.status === 423) {

      if (error.config.url == "/api/users/auth/refresh") {
        console.log('error ' , error)
      }
      else {
        try {
          const response = await mainApiInstance.post(`/api/users/auth/refresh`);
          return mainApiInstance(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);