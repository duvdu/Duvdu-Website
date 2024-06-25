

import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetUserProject = ({ page = "1", limit = "", search = "", username }) => {
  const req = "GetUserProject"
  return async dispatch => {
    return
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const params = {};
      const userName = "";
      if (search?.length > 0) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (username) userName = `/${username}`;
      const queryString = new URLSearchParams(params).toString();
      const response = await mainApiInstance.get(`api/users/auth/profile/projects${userName}/?${queryString}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_DATA, payload: response.data.data });

    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};