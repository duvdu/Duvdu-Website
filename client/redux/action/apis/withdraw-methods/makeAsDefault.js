import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const makeWithdrawMethodAsDefault = (id) => {

  const req = "makeWithdrawMethodAsDefault"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      if(!id) {
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
        return
      }
  
      const response = await mainApiInstance.patch(`api/users/withdraw/${id}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {
        message:'success'
     }, req: req });
    } catch (error) {
      try {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
      }
      catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: "unknown", req: req });
      }
    }
  };
};

// {
//   "title":""
// }