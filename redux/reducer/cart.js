import storage from "../../util/localStorage";
import { deleteProject, findProjectIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

export default (state = [], action) => {
    let index = null;

    switch (action.type) {
        case Types.INIT_LOCALSTORAGE:
            return [...action.payload.cart];

        case Types.ADD_TO_CART:
            index = findProjectIndexById(state, action.payload.project.id);

            if (index !== -1) {
                state[index].quantity += 1;
                storage.set("dokani_cart", [...state]);

                return [...state];
            } else {
                if (!action.payload.project.quantity) {
                    action.payload.project.quantity = 1;
                }
                storage.set("dokani_cart", [...state, action.payload.project]);

                return [...state, action.payload.project];
            }

        case Types.DELETE_FROM_CART:
            const newCartItems = deleteProject(state, action.payload.projectId);
            storage.set("dokani_cart", newCartItems);

            return [...newCartItems];

        case Types.INCREASE_QUANTITY:
            index = findProjectIndexById(state, action.payload.projectId);
            if (index === -1) return state;

            state[index].quantity += 1;
            storage.set("dokani_cart", [...state]);

            return [...state];

        case Types.DECREASE_QUANTITY:
            index = findProjectIndexById(state, action.payload.projectId);
            if (index === -1) return state;

            const quantity = state[index].quantity;
            if (quantity > 1) state[index].quantity -= 1;
            storage.set("dokani_cart", [...state]);

            return [...state];

        case Types.CLEAR_CART:
            storage.set("dokani_cart", []);
            return [];

        default:
            return state;
    }
};
