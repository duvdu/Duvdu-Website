import * as Types from "../constants/actionTypes";
// Initial state
const initstate = {
    login: false,
  
};

// Reducer function
const auth = (state = initstate, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...state,
                login: true
            };
            
        case Types.LOGOUT:
            return {
                ...state,
                login: false
            };

           
        default:
            return state;
    }
};

export default auth;