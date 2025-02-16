import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances';
// 
export const submitFile = ({ id, type , data }) => {
    const req = "submitFile";
    return async dispatch => {
        if (!id) {
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
            return;
        }
        dispatch({ type: Types.FETCH_DATA_REQUEST, req });
        try {
            let response;
            switch (type) {
                case "copyrights":
                    response = await mainApiInstance.post(`/api/contracts/contractFiles/${id}`,{
                        ...data,
                        cycle:'copy-rights'
                    });
                    break;
                case "project":
                    response = await mainApiInstance.post(`/api/contracts/contractFiles/${id}`,{
                        ...data,
                        cycle:'project'
                    });
                    break;
                case "team":
                    response = await mainApiInstance.post(`/api/contracts/contractFiles/${id}`,{
                        ...data,
                        cycle:'team-project'
                    });
                    break;
                default:
                    dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req });
                    return;
            }
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: {message:"success"}, req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: error.response ? JSON.stringify(error.response.data) : error.message, req });
        }
    };
};