// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'
export const toggleDarkMode = (value) => dispatch => {
    if (value)
        dispatch({ type: Types.DARK })
    else
        dispatch({ type: Types.LIGHT })
};

export const toggleLanguage = () => dispatch => {
    dispatch({ type: Types.LANGUAGE })
};

export const headerPopUp = (value) => dispatch => {
    dispatch({ type: value })
};