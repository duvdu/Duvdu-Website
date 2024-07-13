import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const swapFollow = (id, isFollow) => {
  const req = "swapFollow";
  return async dispatch => {
    if (id === -1) {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
      return;
    }
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = isFollow
        ? await mainApiInstance.patch(`api/users/follow/unfollow-user/${id}`)
        : await mainApiInstance.patch(`api/users/follow/follow-user/${id}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {isFollow : !isFollow}, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};
