import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';

export const payment = ({ id, type }) => {
    const req = "payment";
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req });
        try {
            let response;
            switch (type) {
                case "rental":
                    response = await mainApiInstance.post(`/api/rentals/rental/contract/pay/${id}`);
                    break;
                case "producer":
                    response = await mainApiInstance.patch(`/api/producers/contract/pay/${id}`);
                    break;
                case "copyrights":
                    response = await mainApiInstance.get(`/api/copyrights/contract/pay/${id}`);
                    break;
                case "project":
                    response = await mainApiInstance.post(`/api/projects/contract/pay/${id}`);
                    break;
                case "team":
                    response = await mainApiInstance.post(`/api/team/contract/pay/${id}`);
                    break;
                default:
                    dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
                    return;
            }
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {data:response.data}, req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.response ? JSON.stringify(error.response.data) : error.message, req });
        }
    };
};