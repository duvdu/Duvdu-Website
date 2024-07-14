import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const AddTeamProject = (data, id) => {

  const req = "AddTeamProject"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {

      const response = await mainApiInstance.post(`api/team/${id}/creative`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
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