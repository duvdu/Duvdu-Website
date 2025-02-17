import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const googleLogin = ({ username, id, name , email}) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'login' });
    try {
      const response = await mainApiInstance.post('api/users/auth/provider', {
        username:username.toLowerCase(),
        name,
        email,
        googleId: id,
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'login'});
      } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) , req: 'login'});
    }
  };
};
