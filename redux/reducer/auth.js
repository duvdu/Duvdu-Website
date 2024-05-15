import * as Types from "../constants/actionTypes";
// Initial state
const initstate = {
    username: null,
    isVerify: null,
    login: null,
    user: null,
};

// Reducer function
const auth = (state = initstate, action) => {
    switch (action.type) {
        case Types.LOGOUT:
        case Types.USER_NONE:
            return {
                ...state,
                username: Types.USER_NONE,
                login: false,

            };

        case Types.SET_USER:
            return {
                ...state,
                user: action.payload,
                username: action.payload.username,
                login: true
            };
        case Types.VERIFIED:
            return {
                ...state,
                isVerify: action.payload,
            };

        default:
            return state;
    }
};

export default auth;