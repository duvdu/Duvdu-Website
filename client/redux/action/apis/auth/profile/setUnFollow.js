
import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const setUnFollow = (id) => {
  const req = "setUnFollow"
  return async dispatch => {
    if (id == -1) {
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
        return
    }
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.patch(`api/users/follow/unfollow-user/${id}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

