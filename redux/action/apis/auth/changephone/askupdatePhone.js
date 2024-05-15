import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const askChangePhone = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'askChangePhone' });
    try {
      const response = await mainApiInstance.get(`api/users/auth/update-phone`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'askChangePhone' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'askChangePhone' });
    }
  };
};

