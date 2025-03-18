import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from "../axiosInstances";


export const contractCancel = ({data}) => {
    const req = "contractCancel";
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.post(`api/contracts/contractCancel`,data);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
