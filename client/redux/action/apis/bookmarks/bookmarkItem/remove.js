import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const DeleteProjectFromBoard = (idBoard , idProject) => {
    const req = "DeleteProjectFromBoard"
    return async dispatch => {
        
        try {
            const response = await mainApiInstance.delete(`/api/users/bookmarks/${idBoard}/${idProject}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
             dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};