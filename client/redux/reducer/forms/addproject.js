import * as ActionTypes from "../../constants/actionFormsTypes";

const _initialState = {
    formData: {

    },
    errors: {},
    postSuccess: false,
    categories: [],
};

const initialState = {
    formData: {

    },
    errors: {},
    postSuccess: false,
    categories: [],
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FORM_DATA:
            const { field, value } = action.payload;
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [field]: value
                }
            };
        case ActionTypes.INSERT_TO_ARRAY:
            // Properly scope field and value within the case
            const { field: insertField, value: insertValue } = action.payload;
            const array = state.formData[insertField] || [];  // Use existing array or start a new one if not present
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [insertField]: [...array, insertValue]  // Always append to the array
                }
            };

        case ActionTypes.REMOVE_ITEM_FROM_FIELD:
            const { field: removeField, index } = action.payload;
            const updatedArray = state.formData[removeField].filter((_, idx) => idx !== index);
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [removeField]: updatedArray
                }
            };
        case ActionTypes.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case ActionTypes.RESET_FORM:
            
            return _initialState;
        
        case ActionTypes.SET_POST_SUCCESS:
            return {
                ...state,
                postSuccess: action.payload
            };
        default:
            return state;
    }
};

export default formReducer;