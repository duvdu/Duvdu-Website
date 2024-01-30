import { deleteproject, findprojectIndexById } from "../../util/util";
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
            const mergeAllprojects = [
                ...state.items,
                ...action.payload.projects,
            ];
            const limit =
                action.payload.total &&
                mergeAllprojects.length > action.payload.total
                    ? mergeAllprojects.splice(0, action.payload.total)
                    : mergeAllprojects;

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
            return deleteproject(state, action.payload.id);

        case Types.UPDATE_PROJECT:
            const index = findprojectIndexById(state, action.payload.project.id);
            state[index] = action.payload.project;

            return { ...state };

        default:
            return state;
    }
};
