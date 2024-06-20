import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'

export const takeAction = ({ id, data }) => {
    const req = "takeAction"
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
            return
        }
        console.log(id, data)
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.post(`/api/rentals/rental/contract/6673a3e74265d8a918d10d53/action`, data);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};