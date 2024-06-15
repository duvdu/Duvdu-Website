import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const getMyprofile = (withloading) => {
  const req = "getMyprofile"
  return async dispatch => {
    if (withloading === false)
      dispatch({ type: Types.DISABLE_LOADING, });
    if (withloading === true)
      dispatch({ type: Types.ENABLE_LOADING, });

    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });

    try {
      const response = await mainApiInstance.get('/api/users/auth/profile');
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_PROFILE_DATE, payload: response.data.data });
      dispatch({ type: Types.SET_USER, payload: response.data.data })
      
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
      dispatch({ type: Types.LOGOUT })
    }
  };
}
