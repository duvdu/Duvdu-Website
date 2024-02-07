import * as Types from "../constants/actionTypes";

export default (state = { category: "" }, action) => {
    switch (action.type) {
        case Types.UPDATE_PROJECT_FILTERS:
            return {
                ...state,
                ...action.payload.projectFilters,
            };

        case Types.UPDATE_PROJECT_CATEGORY:
            const { category } = action.payload;
            return {
                ...state,
                category,
            };
        case Types.UPDATE_RATING:
            const { rating } = action.payload;
            return {
                ...state,
                rating,
            };

        default:
            return state;
    }
};
