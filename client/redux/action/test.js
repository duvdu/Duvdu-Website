// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'
export const increment = () => dispatch => {
    dispatch({ type: Types.INCREMENT })
};
export const decrement = () => dispatch => {
    dispatch({ type: Types.DECREMENT })
};