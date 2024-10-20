import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const DeleteCategoryTeam = (data) => {
  const req = "DeleteCategoryTeam"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
  
      const response = await mainApiInstance.delete(`api/team/${data.teamId}/category/${data.categoryId}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {
        message:'success'
     }, req: req });
    } catch (error) {
       dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};