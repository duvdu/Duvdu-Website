import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances';

export const SwapProjectToFav = ({ projectId, action }) => {
    const req = "SwapProjectToFav";
    return async dispatch => {
        
        if (!projectId || !action) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
            return;
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        
        try {
            const response = await mainApiInstance.patch(`api/users/auth/profile/favourites/${projectId}?action=${action}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: { ...response.data, projectId , action }, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
