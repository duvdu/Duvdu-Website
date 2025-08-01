import * as Types from "../constants/actionTypes";

const initialState = {};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_DATA_REQUEST:
            return {
                ...state,
                [action.req]: {
                    // ...state[action.req],
                    loading: true,
                    error: null,
                    ...action.payload,
                    req: action.req
                }
            };

        case Types.FETCH_DATA_SUCCESS:
            return {
                ...state,
                [action.req]: {
                    // ...state[action.req],
                    loading: false,
                    error: null,
                    ...action.payload,
                    req: action.req
                }
            };

        case Types.APPEND_DATA_SUCCESS:
            const existingData = state[action.req]?.data || [];
            const newData = action.payload?.data || [];
            console.log('Appending data:', { existingData: existingData.length, newData: newData.length });
            return {
                ...state,
                [action.req]: {
                    ...state[action.req],
                    loading: false,
                    error: null,
                    data: [...existingData, ...newData],
                    pagination: action.payload?.pagination,
                    req: action.req
                }
            };

        case Types.FETCH_DATA_FAILURE:
            return {
                ...state,
                [action.req]: {
                    // ...state[action.req],
                    loading: false,
                    error: action.payload,
                    req: action.req
                }
            };

        default:
            return state;
    }
};

export default dataReducer;
