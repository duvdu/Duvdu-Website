import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const faceVerification = ({data }) => {
  return async dispatch => {
    if(!data){
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: 'faceVerification' });
      return;
    };
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'faceVerification' });
    try {
      const response = await mainApiInstance.post(`api/users/auth/face-recognition`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'faceVerification' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response?.data || error.message), req: 'faceVerification' });
    }
  };
};
