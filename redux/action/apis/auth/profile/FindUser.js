import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const FindUser = ( search = "", page = 1, limit = 10 ) => {
    const req = "FindUser";
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            // Construct query string only with provided parameters
            const params = {};
            if (search.length>0) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;

            const queryString = new URLSearchParams(params).toString();
            const response = await mainApiInstance.get(`/api/users/auth/find?${queryString}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
