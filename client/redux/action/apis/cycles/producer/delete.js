import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const DeleteProducer = (data) => {
    const req = "DeleteProducer"
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            if (data == -1) {
                dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
                return
            }
            const response = await mainApiInstance.delete(`/api/producers/producer/user`,);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {
                message:'success'
             }, req: req });
            dispatch({ type: Types.SET_DATA, payload: response.data.data });
        } catch (error) {
            // 
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};