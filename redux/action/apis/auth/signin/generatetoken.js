import * as Types from "../../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const generateToken = () => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST });
      try {
        const response = await mainApiInstance.post('api/users/auth/refresh');
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.message });
      }
    };
  };
  