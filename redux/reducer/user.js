import * as Types from "../constants/actionTypes";
// Initial state
const initialState = {
    profile: null
  };
  
  const User = (state = initialState, action) => {
    switch (action.type) {
      case Types.SET_PROFILE_DATE:
        return {
          ...state,
          profile: action.payload
        };
      default:
        return state;
    }
  };
  
  export default User;