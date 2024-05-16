import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetNotifications = () => {
    const req = "GetNotifications"
    return async dispatch => {
        dispatch({ type: Types.NONEPOPUP });
        try {
            const response = await mainApiInstance.get(`api/notification`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};