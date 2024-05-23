import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetProjects = ({ page="", limit="",search="" }) => {
  const req = "GetProjects"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const params = {};
            if (search) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;
            const queryString = new URLSearchParams(params).toString();

      const response = await mainApiInstance.get(`api/portfolio-post?${queryString}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_DATA, payload: response.data.data });
      
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};