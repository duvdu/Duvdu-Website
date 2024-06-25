import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetFavList = ({ page="", limit="",search="" }) => {
    const req = "GetFavList"
    return async dispatch => {
        try {
            const params = {};
            if (search?.length > 0) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;
            const queryString = new URLSearchParams(params).toString();
            const response = await mainApiInstance.get(`api/users/auth/profile/favourites?${queryString}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};