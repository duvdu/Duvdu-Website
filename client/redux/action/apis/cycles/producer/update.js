import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const UpdateProducer = (data) => {
  const req = "UpdateProducer"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      if (data == -1) {
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
        return
      }
      const response = await mainApiInstance.patch(`api/producers/producer`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};
