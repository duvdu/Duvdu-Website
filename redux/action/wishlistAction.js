import * as Types from '../constants/actionTypes'


export const openWishlistModal = e => dispatch => {
    dispatch({
        type: Types.OPEN_WISHLIST,
    })
}

export const closeWishlistModal = e => dispatch => {

    dispatch({
        type: Types.CLOSE_WISHLIST,
    })
}

export const addToWishlist = project => dispatch => {
    dispatch({
        type: Types.ADD_TO_WISHLIST,
        payload: { project }
    })
}


export const deleteFromWishlist = projectId => dispatch => {
    dispatch({
        type: Types.DELETE_FROM_WISHLIST,
        payload: { projectId }
    })
}

export const clearWishlist = () => dispatch => {
    dispatch({
        type: Types.CLEAR_WISHLIST,
    })
}