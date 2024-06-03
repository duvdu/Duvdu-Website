import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const getAllContracts = () => {
  const req= 'getAllContracts'
  return async dispatch => {
       
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.get(`api/contracts`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_CATEGORIES, payload: response.data.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

