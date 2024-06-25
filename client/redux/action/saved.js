// import fetch from 'isomorphic-unfetch'

import * as Types from '../constants/actionTypes'
export const SawpFav = ({id}) => dispatch => {
    dispatch({ type: Types.SAWAP_FAV , payload: id})
};