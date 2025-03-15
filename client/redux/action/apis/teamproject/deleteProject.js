import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const DeleteTeamProjects = (id) => {
    const req = "DeleteTeamProjects"
    return async dispatch => {
    if(!id){
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
        return
    }
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        
        try {
            const response = await mainApiInstance.delete(`api/team/${id}`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {
                message:'success'
            }, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};