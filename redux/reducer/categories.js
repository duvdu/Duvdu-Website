import * as Types from "../constants/actionTypes";
const initstate = [];

export default (state = initstate, action) => {
    switch (action.type) {
        case Types.SET_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
};
