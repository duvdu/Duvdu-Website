import * as Types from "../../constants/actionTypes";

const initialState = {
    list: [],
};

// Reducer function
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_CHATS:
            return {
                ...state,
                list: action.payload
            }
        
        default:
            return state;
    }
};

export default Reducer;