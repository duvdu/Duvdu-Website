import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const CheckUsernameExists = (username) => {
  const req = "CheckUsernameExists"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      
      const response = await mainApiInstance.post('api/users/auth/retreive-username', {
        "username": username
    });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      
    }
  };
};
