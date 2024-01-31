import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

const initialState = {
    isDarkMode: false,
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.TOGGLE_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        default:
            return state;
    }
};
