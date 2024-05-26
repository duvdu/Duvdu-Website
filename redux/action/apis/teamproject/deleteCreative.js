import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const DeleteCreativeProjects = (id) => {
    const req = "DeleteCreativeProjects"
    return async dispatch => {
        
        try {
            const response = await mainApiInstance.delete(`api/team/${id}/user`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            // console.log("error " , JSON.stringify(error.response))
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};