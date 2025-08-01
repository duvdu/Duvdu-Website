import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'
// import { io } from "socket.io-client";

// let socket;

export const GetNotifications = (params) => {
    const req = "GetNotifications";
    return async dispatch => {
        // If it's the first page, show loading, otherwise don't show loading for pagination
        if (!params?.page || params.page === 1) {
            dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        }
        try {
            const response = await mainApiInstance.get(`api/notification`, {params});
            
            // If it's pagination (page > 1), append to existing data
            if (params?.page && params.page > 1) {
                dispatch({ 
                    type: Types.APPEND_DATA_SUCCESS, 
                    payload: response.data, 
                    req: req 
                });
            } else {
                dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
            }
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
