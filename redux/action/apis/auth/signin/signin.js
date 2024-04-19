import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const login = ({ username, password }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST });
    try {
      const response = await mainApiInstance.post('api/users/auth/signin', {
        username: username,
        password: password
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};
