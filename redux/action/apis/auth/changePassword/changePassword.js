import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const ChangePassword = ({ newPassword, oldPassword }) => {
  const req = 'ChangePassword'
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.patch(`api/users/auth/change-password`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

