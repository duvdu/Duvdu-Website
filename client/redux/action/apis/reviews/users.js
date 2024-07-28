import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from "../axiosInstances";


export const userReview = ({ username }) => {
    const req = "userReview";
    return async dispatch => {
        try {
            const response = await mainApiInstance.get(`api/analysis/contract-review?sp=${username}&lmit=999`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
