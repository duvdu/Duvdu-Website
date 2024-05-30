import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'
import { io } from "socket.io-client";


export const getFollowing = () => {
  const req = "getFollowing"
  return async dispatch => {
    
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });

    try {
      const response = await mainApiInstance.get('/api/users/follow/user-following');
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
      dispatch({ type: Types.USER_NONE })
    }
  };
}
