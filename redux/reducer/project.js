import { deleteProduct, findProductIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

const initstate = {
    items: []
};

export default (state = initstate, action) => {
    switch (action.type) {
        case Types.SET_DATA:
            return {
                ...state,
                items: action.payload,
            };
        case Types.FETCHED_PROJECT:
            return {
                ...state,
                items: [...action.payload.projects],
            };

        default:
            return state;
    }
};