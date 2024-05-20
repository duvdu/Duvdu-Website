import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const UpdateTeamProject = (data,id) => {
  
  const req = "UpdateTeamProject"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
  
      const response = await mainApiInstance.put(`api/team/${id}/user`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};