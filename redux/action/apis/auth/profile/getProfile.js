import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'
import { io } from "socket.io-client";


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
      // const socket = io(process.env.BASE_URL);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_PROFILE_DATE, payload: response.data.data });
      dispatch({ type: Types.SET_USER, payload: response.data.data })
      // socket.on("connect", () => console.log("Open Channel"));
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
      dispatch({ type: Types.USER_NONE })
    }
  };
}
