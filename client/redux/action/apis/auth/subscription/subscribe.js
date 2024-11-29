import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const subscribe = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'subscribe' });
    try {
      const response = await mainApiInstance.post(`api/contracts/subscribe/subscribe-user`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'subscribe' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response?.data || error.message), req: 'subscribe' });
    }
  };
};
