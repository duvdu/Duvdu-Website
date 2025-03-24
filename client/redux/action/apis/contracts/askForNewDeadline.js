import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from "../axiosInstances";


export const contractNewDeadline = ({data , id , type}) => {
    const req = "contractNewDeadline";
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            let response;
            switch (type) {
                case "project":
                    response = await mainApiInstance.post(`api/projects/contract/${id}/ask-for-new-deadline`,data);
                case "copyrights":
                    response = await mainApiInstance.post(`api/copyrights/contract/${id}/ask-for-new-deadline`,data);
                case "team":
                    response = await mainApiInstance.post(`api/team/contract/${id}/ask-for-new-deadline`,data);
                default:
                    dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
                    return;
            }
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
