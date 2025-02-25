import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const UpdateRental = (id,data) => {
  
  const req = "UpdateRental"
  return async dispatch => {
    if(data == -1) {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
      return
    }
    
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
  
      const response = await mainApiInstance.patch(`api/rentals/rental/${id}`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {message:"success"}, req: req });
    } catch (error) {
       dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};