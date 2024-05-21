import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const DeleteProjectFromBoard = (idBoard , idProject) => {
    const req = "DeleteProjectFromBoard"
    return async dispatch => {
        dispatch({ type: Types.NONEPOPUP });
        try {
            console.log(idBoard , idProject)
            const response = await mainApiInstance.delete(`/api/users/saved-projects/${idBoard}/project/${idProject}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};