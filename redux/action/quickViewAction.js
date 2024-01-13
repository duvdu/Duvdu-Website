import * as Types from '../constants/actionTypes'

export const openQuickView = project => dispatch =>{
    dispatch({
        type: Types.OPEN_QUICK_VIEW,
        payload: { project }
    })
}

export const closeQuickView = ()=> dispatch =>{
    dispatch({
        type: Types.CLOSE_QUICK_VIEW,
    })
}