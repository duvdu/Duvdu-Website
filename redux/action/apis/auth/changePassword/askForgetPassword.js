import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const ASKforgetpassword = ({ username }) => {
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'ASKforgetpassword' });
        try {
            const response = await mainApiInstance.get(`/api/users/auth/reset-password/` + username);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'ASKforgetpassword' });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'ASKforgetpassword' });
        }
    };
};

