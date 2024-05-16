import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const updateProfile = (data,withloading) => {
  const req = "updateProfile"
  return async dispatch => {
    if (withloading === false)
      dispatch({ type: Types.DISABLE_LOADING, });
    if (withloading === true)
      dispatch({ type: Types.ENABLE_LOADING, });

    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      for (let [name, value] of data) {
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
      }
      const response = await mainApiInstance.patch(`api/users/auth/profile`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};