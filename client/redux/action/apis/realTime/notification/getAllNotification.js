import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'
import { io } from "socket.io-client";

let socket;

export const GetNotifications = () => {
    const req = "GetNotifications";
    return async dispatch => {
        try {
            const response = await mainApiInstance.get(`api/notification`);
            
            if (!socket) {
                socket = io(process.env.BASE_URL); // BASE_URL = https://www.duvdu.com/
                socket.on("connect", () => console.log("Connected to socket"));

                socket.on("new_message", () => {
                    console.log("new_message");
                });

                socket.on("new_follower", () => {
                    console.log("new_follower");
                });

                socket.on("disconnect", () => console.log("Disconnected from socket"));
            }

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
