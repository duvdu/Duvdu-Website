import * as Types from "../../constants/actionTypes";

const _initialState = {
    list: [],
    openchat: false,
    _id: null,
    other: {}
};
const initialState = {
    list: [],
    openchat: false,
    _id: null,
    other: {}
};

// Reducer function
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_MESSAGES_LIST:
            return {
                ...state,
                list: action.payload,
                other: action.other
            }
        case Types.OPEN_CHAT:
            return {
                ...state,
                openchat: true,
                _id: action.payload,
            }
        case Types.CLOSE_CHAT:
            return {
                ...state,
                openchat: false
            }
        case Types.RESET_CHAT:
            return _initialState
        default:
            return state;
    }
};

export default Reducer;