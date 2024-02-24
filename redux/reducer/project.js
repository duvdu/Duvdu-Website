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
            const mergeAllProjects = [
                ...state.items,
                ...action.payload.projects,
            ];
            // console.log(mergeAllProjects);
            const limit =
                action.payload.total &&
                mergeAllProjects.length > action.payload.total
                    ? mergeAllProjects.splice(0, action.payload.total)
                    : mergeAllProjects;

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
