import * as Types from "../constants/actionTypes";
// Initial state
const initstate = {
    ISDARK: false,
    LANGUAGE: 'ENGLISH',
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
        

        default:
            return state;
    }
};

export default setting;