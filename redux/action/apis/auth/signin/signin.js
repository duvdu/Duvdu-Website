import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const login = ({ username, password }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'login' });
    try {
      const response = await mainApiInstance.post('api/users/auth/signin', {
        username: username,
        password: password
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'login'});
      } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) , req: 'login'});
    }
  };
};
