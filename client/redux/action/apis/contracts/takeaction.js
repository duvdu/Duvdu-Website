import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';

export const takeAction = ({ id, data, type }) => {
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
                    response = await mainApiInstance.patch(`/api/producers/contract/${id}`, {
                        ...(typeof data === 'string' ? { appointmentDate: data } : { status: data ? "accepted" : "rejected" })
                    });
                    break;

                case "copyrights":
                    response = await mainApiInstance.post(`/api/copyrights/contract/${id}/action`, {
                        action: data ? "accept" : "reject"
                    });
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
