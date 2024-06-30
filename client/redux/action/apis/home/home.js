import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'

export const HomeTreny = () => {
    const req = "HomeTreny"
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.get(`api/analysis/home/trendycategory`);

            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};

export const HomeDiscover = () => {
    const req = "HomeDiscover"
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.get(`api/analysis/home/discovertags`);

            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};

export const popularSub = () => {
    const req = "popularSub"
    return async dispatch => {
        dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
        try {
            const response = await mainApiInstance.get(`api/analysis/home/popularsubcategory`);

            dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
        } catch (error) {
            dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
        }
    };
};