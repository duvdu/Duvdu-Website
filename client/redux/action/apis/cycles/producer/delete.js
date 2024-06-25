import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const DeleteProducer = (data) => {
    const req = "DeleteProducer"
    return async dispatch => {
        try {
            if (data == -1) {
                dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
                return
            }
            const response = await mainApiInstance.delete(`/api/producers/producer/user`,);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: { "message": "sucess" }, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};