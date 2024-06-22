import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'

export const takeAction = ({ id, data, type }) => {
    const req = "takeAction"
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
            return
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            switch (type) {
                case "rental":
                    {
                        const response = await mainApiInstance.post(`/api/rentals/rental/contract/${id}/action`, {
                            "action": data ? "accepted" : "rejected"
                        });
                        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
                    }
                    break;
                case "producer":
                    {
                        const response = await mainApiInstance.patch(`/api/producers/contract/${id}`, {
                            "status": data ? "accept" : "reject"
                        });
                        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
                    }
                    break;
                case "copyrights":
                    {
                        const response = await mainApiInstance.post(`/api/copyrights/contract/${id}/action`, {
                            "action": data ? "accept" : "reject"
                        });
                        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
                    }
                    break;
                default:
                    break;
            }

        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};