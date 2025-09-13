import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'

export const DeleteAccount = () => {
  const req = "DeleteAccount";
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.delete('api/users/auth/delete');
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.LOGOUT });
      dispatch({ type: Types.NONEPOPUP });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, error: error.message, req: req });
    }
  };
};