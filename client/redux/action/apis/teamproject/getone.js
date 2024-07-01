import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const GetTeamProject = ({ id, page="", limit="" }) => {
    const req = "GetTeamProject"
    return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
            
            const queryString = new URLSearchParams({ page: page, limit: limit }).toString();
            const response = await mainApiInstance.get(`api/team/${id}?${queryString}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};