import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from "../axiosInstances";


export const projectReview = ({ projectID }) => {
    const req = "projectReview";
    return async dispatch => {
        try {
            const response = await mainApiInstance.get(`api/analysis/project-review`);
            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};
