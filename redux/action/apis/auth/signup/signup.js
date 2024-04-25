import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const signup = ({ name, username, password, phoneNumber }) => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'signup' });
      try {
        const response = await mainApiInstance.post('api/users/auth/signup', {
          name: name,
          username: username,
          password: password,
          phoneNumber: {
            number: phoneNumber
          }
        });
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'signup' });
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'signup' });
      }
    };
  };