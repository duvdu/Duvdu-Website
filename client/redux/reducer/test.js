import * as Types from "../constants/actionTypes";
// Initial state
const initialState = {
    count: 0
  };
  
  // Reducer function
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.INCREMENT:
        return {
          ...state,
          count: state.count + 1
        };
      case Types.DECREMENT:
        return {
          ...state,
          count: state.count - 1
        };
      default:
        return state;
    }
  };
  
  export default Reducer;