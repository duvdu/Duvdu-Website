import * as Types from '../constants/actionTypes'
import storage from '../../util/localStorage';

export const addToCart = project => dispatch => {
    dispatch({
        type: Types.ADD_TO_CART,
        payload: { project } 
    })
}


export const deleteFromCart = projectId => dispatch => {
    dispatch({
        type: Types.DELETE_FROM_CART,
        payload: { projectId }
    })
}

export const increaseQuantity = projectId => dispatch => {
    dispatch({
        type: Types.INCREASE_QUANTITY,
        payload: { projectId }
    })
}


export const decreaseQuantity = projectId => dispatch => {
    dispatch({
        type: Types.DECREASE_QUANTITY,
        payload: { projectId }
    })
}



export const openCart = () => dispatch => {
    dispatch({
        type: Types.OPEN_CART,
    })
}

export const clearCart = () => dispatch => {
    dispatch({
        type: Types.CLEAR_CART,
    })
}

export const closeCart = () => dispatch => {
    dispatch({
        type: Types.CLOSE_CART,
    })
}



