import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';

export const acceptFiles = ({ id, type , data , field }) => {
    const req = "acceptFiles";

    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }

        dispatch({ type: Types.FETCH_DATA_REQUEST, req });

        try {
            let response;

            switch (type) {
                case "copyrights":
                    response = await mainApiInstance.patch(`/api/contracts/contractFiles/${id}/${field}`);
                    break;
                case "project":
                    response = await mainApiInstance.patch(`/api/contracts/contractFiles/${id}/${field}`);
                    break;
                case "team":
                    response = await mainApiInstance.patch(`/api/contracts/contractFiles/${id}/${field}`);
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

export const acceptAllFiles = ({ id, type , data , field }) => {
    const req = "acceptAllFiles";

    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }

        dispatch({ type: Types.FETCH_DATA_REQUEST, req });

        try {
            const response = await mainApiInstance.patch(`/api/contracts/${id}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req });
        } catch (error) {
            const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: errorMsg, req });
        }
    };
};
