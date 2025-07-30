import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const GetPage = (id) => {
  const req= 'GetPage'
  return async dispatch => {
    if (!id) {
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
        return;
    }


    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
        const response = await mainApiInstance.get(`api/users/pages/${id}`);
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        dispatch({ type: Types.SET_DATA, payload: response.data.data });
      } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

