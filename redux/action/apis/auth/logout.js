import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'

export const LogOut = () => {
    const req = "LogOut";
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: "login" });
      try {
        const response = await mainApiInstance.post('api/users/auth/logout');
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        dispatch({ type: Types.LOGOUT });
        dispatch({ type: Types.NONEPOPUP });
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, error: error.message, req: req });
      }
    };
  };