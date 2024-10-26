import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'
// import { io } from "socket.io-client";

// let socket;

export const GetNotifications = () => {
    const req = "GetNotifications";
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.get(`api/notification`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};

// Cleanup function to be called when the component is unmounted
export const cleanupSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
