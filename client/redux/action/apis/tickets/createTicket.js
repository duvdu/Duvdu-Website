import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const CreateTicket = ({ message, username, phoneNumber }) => {
    return async dispatch => {
        if(!message){
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: 'CreateTicket' });
            return 
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'CreateTicket' });
        try {
            const response = await mainApiInstance.post(`api/users/tickets`, {
                "name": username,
                "phoneNumber": {
                    "number": phoneNumber
                },
                "message": message
            });
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'CreateTicket' });
        } catch (error) {
            console.log({error});
            if(error.response.status === 404){
                dispatch({ type: Types.FETCH_DATA_FAILURE, payload: 'Token Expired', req: 'CreateTicket' });
            }else{
                dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'CreateTicket' });
            }
        }
    };
};

