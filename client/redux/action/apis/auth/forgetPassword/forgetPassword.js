import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const forgetpassword = ({ username }) => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'forgetpassword' });
      try {
        const response = await mainApiInstance.get(`api/users/auth/reset-password/` + username);
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'forgetpassword'});
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) , req: 'forgetpassword'});
      }
    };
  };