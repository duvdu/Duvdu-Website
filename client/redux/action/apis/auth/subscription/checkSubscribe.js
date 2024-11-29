import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const checkSubscribe =() => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'checkSubscribe' });
    try {
      const response = await mainApiInstance.get(`api/contracts/subscribe/check-user-subscribe`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'checkSubscribe' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response?.data || error.message), req: 'checkSubscribe' });
    }
  };
};
