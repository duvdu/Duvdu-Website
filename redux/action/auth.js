// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'

export const login = () => dispatch => {
    dispatch({ type: Types.SET_USER , payload:{} })
};

export const logout = () => dispatch => {
    dispatch({ type: Types.USER_NONE })
};