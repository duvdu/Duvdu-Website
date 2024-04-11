import * as Types from "../../constants/actionTypes";
import { mainApiInstance } from './axiosInstances'

export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.get('/getdata');
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};