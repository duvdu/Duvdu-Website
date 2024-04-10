// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'

export const login = () => dispatch => {
    dispatch({ type: Types.LOGIN })
};
export const logout = () => dispatch => {
    dispatch({ type: Types.LOGOUT })
};