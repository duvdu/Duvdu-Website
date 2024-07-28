import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const resetpassword = ({ username, newPassword }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'resetpassword' });
    try {
      const data = {
        newPassword: newPassword
      }
      const response = await mainApiInstance.post(`api/users/auth/reset-password/${username}`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'resetpassword' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response?.data || error.message), req: 'resetpassword' });
    }
  };
};
