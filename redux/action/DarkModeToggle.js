import * as Types from '../constants/actionTypes'

export const DarkModeToggle = state => dispatch => {
    dispatch({
        type: Types.TOGGLE_MODE,
        payload: { state } 
    })
}