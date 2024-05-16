
import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const verify = ({ username, code }) => {
  return async dispatch => {
    if(code == -1) {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null , req: 'verify'});
      return
    }
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'verify' });
      try {
        const response = await mainApiInstance.post('api/users/auth/verify', {
          username: username,
          code: code
        });
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'verify'});
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'verify' });
      }
    };
  };