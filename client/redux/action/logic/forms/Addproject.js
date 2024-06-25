import * as ActionTypes from '../../../constants/actionFormsTypes';

export const UpdateFormData = (field, value) => (dispatch) => {
    dispatch({
        type: ActionTypes.UPDATE_FORM_DATA,
        payload: { field, value }
    }); 
};

export const InsertToArray = (field, value) => (dispatch) => {
    dispatch({
        type: ActionTypes.INSERT_TO_ARRAY,
        payload: { field, value }
    });
};

export const setSubmitt = () => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_SUBMITT,
        payload: errors
    });
};

export const setPostSuccess = (isSuccess) => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_POST_SUCCESS,
        payload: isSuccess
    });
};

export const resetForm = () => (dispatch) => {
    dispatch({
        type: ActionTypes.RESET_FORM,
    });
};

export const setErrors = (errors) => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: errors
    });
};
