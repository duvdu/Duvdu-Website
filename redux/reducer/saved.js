import * as Types from "../constants/actionTypes";

const initialState = {
    favId: "",
    boards: []
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SAWAP_FAV:
            return { ...state, error: null,loading: state.loadingenable, req: action.req };

        case Types.ADD_TO:
            return { ...state, boards: action };

        case Types.FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, req: action.req };

        case Types.ENABLE_LOADING:
            return { ...state, loadingenable: true };

        case Types.DISABLE_LOADING:
            return { ...state, loadingenable: false };

        default:
            return state;
    }
};

export default dataReducer;