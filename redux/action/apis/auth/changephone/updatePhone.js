import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const UpdatePhone = ({phoneNumber}) => {
    return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'UpdatePhone' });
    try {
      const response = await mainApiInstance.patch(`api/users/auth/update-phone`, {
        phoneNumber: phoneNumber
      });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'UpdatePhone' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'UpdatePhone' });
    }
  };
};