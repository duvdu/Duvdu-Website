import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const CheckUsernameExists = (username) => {
  const req = "CheckUsernameExists"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      
      const response = await mainApiInstance.post('api/users/auth/retreive-username', {
        "username": username.toLowerCase()
    });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      
    }
  };
};
export const CheckEmailExists = (email) => {
  const req = "CheckEmailExists"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      
      const response = await mainApiInstance.post('api/users/auth/retreive-username', {
        "email": email
    });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      
    }
  };
};
export const CheckPhoneExists = (phone) => {
  const req = "CheckPhoneExists"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      
      const response = await mainApiInstance.post('api/users/auth/retreive-username', {
        "phone": phone
    });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      
    }
  };
};
