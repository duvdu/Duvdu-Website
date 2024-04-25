import * as Types from "../constants/actionTypes";

const initialState = {
    data: null,
    loading: false,
    error: null,
    req: null
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_DATA_REQUEST:
            return { ...state, loading: true, data : null, error: null, req: action.req };

        case Types.FETCH_DATA_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null, req: action.req };

        case Types.FETCH_DATA_FAILURE:
            return { ...state, loading: false, data: null, error: action.payload, req: action.req };
        default:
            return state;
    }
};

export default dataReducer;