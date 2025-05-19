import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from "../axiosInstances";


export const resNewDeadline = ({data , id , type}) => {
    const req = "resNewDeadline";
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
                    response = await mainApiInstance.patch(`api/projects/contract/${id}/respond-to-new-deadline`,data);
                    break;
                case "copyrights":
                    response = await mainApiInstance.patch(`api/copyrights/contract/${id}/respond-to-new-deadline`,data);
                    break;
                case "team":
                    response = await mainApiInstance.patch(`api/team/contract/${id}/respond-to-new-deadline`,data);
                    break;
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
