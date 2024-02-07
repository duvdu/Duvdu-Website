import { deleteProduct, findProductIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

export default (state = { items: [] }, action) => {
    switch (action.type) {
        case Types.FETCHED_PROJECT:
            return {
                ...state,
                items: [...action.payload.projects],
            };

        case Types.FETCHED_MORE_PROJECT:
            const mergeAllProducts = [
                ...state.items,
                ...action.payload.projects,
            ];
            // console.log(mergeAllProducts);
            const limit =
                action.payload.total &&
                mergeAllProducts.length > action.payload.total
                    ? mergeAllProducts.splice(0, action.payload.total)
                    : mergeAllProducts;

            return {
                ...state,
                items: [...limit],
            };

        case Types.ADD_PROJECT:
            return {
                ...state,
                items: [...state.items, action.payload],
            };

        case Types.DELETE_PROJECT:
            return deleteProduct(state, action.payload.id);

        case Types.UPDATE_PROJECT:
            const index = findProductIndexById(state, action.payload.project.id);
            state[index] = action.payload.project;

            return { ...state };

        default:
            return state;
    }
};
