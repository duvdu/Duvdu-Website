import * as Types from "../constants/actionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_DATA_REQUEST:
            return { ...state, loading: true, error: null };

        case Types.FETCH_DATA_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };

        case Types.FETCH_DATA_FAILURE:
            return { ...state, loading: false, data: null, error: action.payload };
        default:
            return state;
    }
};

export default dataReducer;