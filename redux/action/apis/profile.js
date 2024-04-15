import * as Types from "../../constants/actionTypes";
import { mainApiInstance } from './axiosInstances'

export const getMyprofile = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.get('/api/users/auth/profile');
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) });
    }
  };
};

