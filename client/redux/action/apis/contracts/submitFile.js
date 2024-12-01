import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';
// 
export const submitFile = ({ id, type , data }) => {
    const req = "submitFile";
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req });
        try {
            let response;
            switch (type) {
                // case "rental":
                //     response = await mainApiInstance.patch(`/api/rentals/rental/contract/${id}/submit`,data);
                //     break;
                // case "producer":
                //     response = await mainApiInstance.patch(`/api/producers/contract/${id}/submit`,data);
                //     break;
                case "copyrights":
                    response = await mainApiInstance.patch(`/api/copyrights/contract/${id}/submit`,data);
                    break;
                case "project":
                    response = await mainApiInstance.patch(`/api/projects/contract/${id}/submit`,data);
                    break;
                case "team":
                    response = await mainApiInstance.patch(`/api/team/contract/${id}/submit`,data);
                    break;
                default:
                    dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
                    return;
            }
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {message:"success"}, req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.response ? JSON.stringify(error.response.data) : error.message, req });
        }
    };
};