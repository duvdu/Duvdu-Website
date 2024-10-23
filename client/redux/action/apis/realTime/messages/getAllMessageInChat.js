import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'
// import { io } from "socket.io-client";

// let socket;

export const GetAllMessageInChat = (id, limit) => {
    const req = "GetAllMessageInChat"
    return async dispatch => {
        // if (!socket) {
        //     socket = io(process.env.BASE_URL,{
        //         extraHeaders:{
        //             cookie:''
        //         }
        //     });
        //     socket.on("connect", () => console.log("Connected to socket"));

        //     socket.on("new_message", () => {
        //         console.log("new_message");
        //     });

        //     socket.on("new_follower", () => {
        //         console.log("new_follower");
        //     });

        //     socket.on("disconnect", () => console.log("Disconnected from socket"));
        // }


        if (!id) {
            dispatch({ type: Types.RESET_CHAT });
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
            return
        }
        dispatch({ type: Types.OPEN_CHAT, payload: id });
        dispatch({ type: Types.NONEPOPUP });
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {

            const params = {};
            params.limit = limit || 100;
            const queryString = new URLSearchParams(params).toString();
            const response = await mainApiInstance.get(`api/message/${id}/chat?${queryString}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
            dispatch({ type: Types.SET_MESSAGES_LIST, payload: response.data.data, req: req });
        } catch (error) {
            // 
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};