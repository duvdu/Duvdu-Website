import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';

export const acceptFiles = ({ id, data }) => {
    const req = "acceptFiles";

    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }

        dispatch({ type: Types.FETCH_DATA_REQUEST, req });

        try {
            let response;

            response = await mainApiInstance.patch(`/api/contracts/${id}`,data);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req });
        } catch (error) {
            const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: errorMsg, req });
        }
    };
};
