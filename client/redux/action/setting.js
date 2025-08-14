// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'
export const toggleDarkMode = (value) => dispatch => {
    if (value)
        dispatch({ type: Types.DARK })
    else
        dispatch({ type: Types.LIGHT })
};

export const toggleLanguage = (value) => dispatch => {
    dispatch({ type: Types.LANGUAGE, payload:value })
};

export const SetheaderPopUp = (value) => dispatch => {
    console.log(value);
    dispatch({ type: value })
};