import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const appleLogin = ({ username, id, name, email }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'login' });
    try {
      
      // Make sure we have a valid ID from Apple
      if (!id) {
        throw new Error('Invalid Apple user ID');
      }
      
      const response = await mainApiInstance.post('api/users/auth/provider', {
        username: username.toLowerCase(),
        name,
        email,
        appleId: id,
      });
      
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'login'});
    } catch (error) {
      console.error('Apple login error:', error);
      
      // Handle network or server errors
      const errorPayload = error.response 
        ? JSON.stringify(error.response)
        : JSON.stringify({ message: error.message || 'Failed to authenticate with Apple' });
        
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: errorPayload, req: 'login'});
    }
  };
}; 