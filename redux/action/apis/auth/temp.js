import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const apitemp = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: '' });
    try {
      const response = await mainApiInstance.post(`api/users/auth`, {
        newpassword: newpassword
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: '' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: '' });
    }
  };
};

