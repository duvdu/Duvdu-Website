import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const retreiveUsername = ({ username }) => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST });
      try {
        const response = await mainApiInstance.post('api/users/auth/retreive-username', {
          username: username.toLowerCase(),
        });
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) });
      }
    };
  };