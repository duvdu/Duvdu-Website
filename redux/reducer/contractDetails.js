import * as Types from "../constants/actionTypes";
const contract = (state = null, action) => {
    switch (action.type) {
        case Types.CONTRACT:
            return action.payload;
        default:
            return state;
    }
};

export default contract;