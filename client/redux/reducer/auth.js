import * as Types from "../constants/actionTypes";

// Initial state
const initstate = {
    username: null,
    isVerify: null,
    login: null,
    user: null,
};

// Function to load state from localStorage
const loadStateFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        try {
            const serializedState = sessionStorage.getItem('authState');
            if (serializedState === null) {
                return initstate;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            console.error("Could not load state from localStorage", err);
            return initstate;
        }
    }
    return initstate;
};

// Function to save state to localStorage
const saveStateToLocalStorage = (state) => {
    if (typeof window !== "undefined") {
        try {
            const serializedState = JSON.stringify(state);
            sessionStorage.setItem('authState', serializedState);
        } catch (err) {
            console.error("Could not save state to localStorage", err);
        }
    }
};

// Reducer function
const auth = (state = initstate, action) => {
    let newState;
    switch (action.type) {
        case Types.LOGOUT:
            newState = {
                username: null,
                isVerify: null,
                login: false,
                user: null,
            };
            break;

        case Types.SET_USER:
            newState = {
                ...state,
                user: action.payload,
                username: action.payload.username,
                login: true,
            };
            break;

        case Types.VERIFIED:
            newState = {
                ...state,
                isVerify: action.payload,
            };
            break;

        case Types.INIT_APP:
            newState = loadStateFromLocalStorage();
            break;

        default:
            newState = state;
            break;
    }

    if (newState.login !== null) {
        saveStateToLocalStorage(newState);
    }

    return newState;
};

export default auth;
