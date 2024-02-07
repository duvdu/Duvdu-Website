import * as Types from '../constants/actionTypes'


export const openCompareModal = e => dispatch => {
    dispatch({
        type: Types.OPEN_COMPARE,
    })
}

export const closeCompareModal = e => dispatch => {
    dispatch({
        type: Types.CLOSE_COMPARE,
    })
}

export const addToCompare = project => dispatch => {
    dispatch({
        type: Types.ADD_TO_COMPARE,
        payload: { project }
    })
}


export const deleteFromCompare = projectId => dispatch => {
    dispatch({
        type: Types.DELETE_FROM_COMPARE,
        payload: { projectId }
    })
}

export const clearCompare = () => dispatch => {
    dispatch({
        type: Types.CLEAR_COMPARE,
    })
}

