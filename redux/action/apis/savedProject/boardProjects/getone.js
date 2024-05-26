import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetSavedBoard = ({ id = "", page="", limit="",search="" }) => {
    const req = "GetSavedBoard"
    return async dispatch => {
        
        try {
            const params = {};
            if (search) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;
            const queryString = new URLSearchParams(params).toString();
            const response = await mainApiInstance.get(`api/users/saved-projects/${id}?${queryString}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};