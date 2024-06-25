// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'

export const verify = ({ isVerify }) => dispatch => {
    dispatch({ type: Types.VERIFIED, payload: isVerify })
};