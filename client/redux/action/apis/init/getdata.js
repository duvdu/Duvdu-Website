import * as Types from "../../../constants/actionTypes";
export const init = () => {

    return async dispatch => {
        dispatch({type:Types.INIT_APP})
    }
}