import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const AcceptInvitation = (id,isAccept) => {
  
  const req = "AcceptInvitation"
  return async dispatch => {
    if(!id) {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
      return 
    }
   
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.post(`api/projects/${id}`, {
        "status": isAccept===true?"accepted":"rejected"
    });
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // 
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};