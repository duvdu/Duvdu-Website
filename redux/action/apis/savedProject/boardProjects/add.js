import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const AddProjectToBoard = ({ idboard, idproject }) => {
    const req = "AddProjectToBoard"
    return async dispatch => {
        if(idboard == -1) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
            return
          }
        dispatch({ type: Types.NONEPOPUP });
        try {
            const response = await mainApiInstance.post(`api/users/saved-projects/${idboard}/project/${idproject}`,);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};