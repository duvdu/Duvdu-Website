import { errorConvertedMessage } from "../../util/util";
import * as Types from "../constants/actionTypes";

const initialState = {
    message: null,
    error: null,
    number_error: null,
    type: null,
};

const errors = (state = initialState, action) => {
    switch (action.type) {
        case Types.SETERROR:
        case Types.FETCH_DATA_FAILURE:
            {
                try {
                    const errormesg = errorConvertedMessage(action.payload)?.toLowerCase();
                    if (errormesg.includes("account not verified reason") && errormesg.includes("signup")) {
                        return { ...state, errorMessage: "Your account is not verified.", number_error: 1, error: Types.ERROR_SIGNUP_VERIFY };
                    } else {
                        // Default case if no known errors are matched
                        return { ...state, errorMessage: "An unknown error occurred.", number_error: 0, error: Types.ERROR_UNKNOWN };
                    }
                }
                catch (ex) {
                    return errorConvertedMessage(action.payload)
                }
            }


        default:
            return state;
    }
};

export default errors;