import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';

export const takeAction = ({ id, data, type, isUpdate = false }) => {
    const req = "takeAction";

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
                    response = await mainApiInstance.post(`/api/rentals/rental/contract/${id}/action`, {
                        action: data ? "accept" : "reject"
                    });
                    break;

                case "producer":
                    if (isUpdate) {
                        response = await mainApiInstance.patch(`/api/producers/contract/${id}`, data);
                    } else {
                        response = await mainApiInstance.patch(`/api/producers/contract/${id}`, {
                            status: data ? "accepted" : "rejected"
                        });
                    }
                    break;

                case "copyrights":
                    if (isUpdate) {
                        response = await mainApiInstance.patch(`/api/copyrights/contract/${id}`, data);
                    } else {
                        response = await mainApiInstance.post(`/api/copyrights/contract/${id}/action`, {
                            action: data ? "accept" : "reject"
                        });
                    }
                    break;
                    
                case "project":
                    if (isUpdate) {
                        response = await mainApiInstance.patch(`/api/project/contract/${id}/contract`, data);
                    } else {
                        response = await mainApiInstance.post(`/api/project/contract/${id}/action`, {
                            action: data ? "accept" : "reject"
                        });
                    }
                    break;

                default:
                    dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
                    return;
            }

            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req });
        } catch (error) {
            const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: errorMsg, req });
        }
    };
};
