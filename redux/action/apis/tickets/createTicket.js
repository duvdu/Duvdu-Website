import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const CreateTicket = ({ message, username, phoneNumber }) => {
    console.log(
        {
            "name": username,
            "phoneNumber": {
                "number": phoneNumber
            },
            "message": message
        }
    )
    return async dispatch => {
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
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'CreateTicket' });
        }
    };
};

