import * as Types from "../../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const generateToken = () => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST , req: 'generateToken'});
      try {
        const response = await mainApiInstance.post('api/users/auth/refresh');
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'generateToken'});
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'generateToken' });
      }
    };
  };
  