import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const resendCode = ({ username }) => {

    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'resendCode' });
      try {
        const response = await mainApiInstance.post('api/users/auth/resend-code', {
          login: username,
        });
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'resendCode'});
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'resendCode' });
      }
    };
  };