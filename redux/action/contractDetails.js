// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'
export const toggleContractData = (value) => dispatch => {
    dispatch({ type: Types.CONTRACT, payload:value })
};
