import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const DeleteSavedBoard = (id) => {
    const req = "DeleteSavedBoard"
    return async dispatch => {
        if (id == -1) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
            return
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.delete(`api/users/saved-projects/${id}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
              dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};