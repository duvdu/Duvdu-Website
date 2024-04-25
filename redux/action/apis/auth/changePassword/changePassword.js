import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const ChangePassword = ({newPassword , username}) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'ChangePassword' });
    try {
      const response = await mainApiInstance.post(`api/users/auth/reset-password/` + username,{
        newPassword: newPassword
    });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'ChangePassword' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'ChangePassword' });
    }
  };
};

