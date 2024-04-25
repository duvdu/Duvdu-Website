import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const getMyprofile = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'getMyprofile' });
    try {
      const response = await mainApiInstance.get('/api/users/auth/profile');
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'getMyprofile' });
      dispatch({ type: Types.SET_PROFILE_DATE, payload: response.data });
      dispatch({ type: Types.SET_USER, payload: response.data.data })
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'getMyprofile' });
      dispatch({ type: Types.DENIED });
      dispatch({ type: Types.USER_NONE })
    }
  };
}
