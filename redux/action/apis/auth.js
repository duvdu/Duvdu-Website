import * as Types from "../../constants/actionTypes";
import { mainApiInstance } from './axiosInstances'

export const login = ({username , password}) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.post('api/users/auth/signin', {
        username: username,
        password: password
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};

export const signup = ({ name, username, password, phoneNumber }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.post('api/users/auth/signup', {
        name: name,
        username: username,
        password: password,
        phoneNumber: {
          number: phoneNumber
        }
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) });
    }
  };
};


export const verify = ({ username, code }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.post('api/users/auth/verify', {
        username: username,
        code: code
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) });
    }
  };
};

export const resendCode = ({username}) => {
  
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.post('api/users/auth/resend-code', {
        username: username,
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) });
    }
  };
};

