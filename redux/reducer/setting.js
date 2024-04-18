import * as Types from "../constants/actionTypes";
// Initial state
const initstate = {
    ISDARK: false,
    LANGUAGE: 'English',
    headerpopup: Types.NONEPOPUP
};

// Reducer function
const setting = (state = initstate, action) => {
    switch (action.type) {
        case Types.DARK:
            return {
                ...state,
                ISDARK: true
            };
        case Types.LIGHT:
            return {
                ...state,
                ISDARK: false
            };

        case Types.SHOWNOTOFICATION:
        case Types.SHOWPROFILE:
        case Types.SHOWSETTING:
        case Types.NONEPOPUP:
            return {
                ...state,
                headerpopup: action.type
            }
        case Types.LANGUAGE:
            return {
                ...state,
                LANGUAGE: action.payload
            };


        default:
            return state;
    }
};

export default setting;