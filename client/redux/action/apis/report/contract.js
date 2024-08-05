import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from "../axiosInstances";


export const contractReport = ({data}) => {
    const req = "contractReport";
    return async dispatch => {
        try {
            const response = await mainApiInstance.post(`api/contracts/complaints`,data);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
