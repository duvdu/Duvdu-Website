import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetAllMessageInChat = (id) => {
    const req = "GetAllMessageInChat"
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.RESET_CHAT });
            return
        }
        dispatch({ type: Types.OPEN_CHAT, payload: id });
        dispatch({ type: Types.NONEPOPUP });
        try {
            const response = await mainApiInstance.get(`api/message/${id}/chat`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
            dispatch({ type: Types.SET_MESSAGES_LIST, payload: response.data.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};