import * as Types from '../constants/actionTypes'

export const updateprojectFilters = projectFilters => dispatch => {
    dispatch({
        type: Types.UPDATE_PROJECT_FILTERS,
        payload:{ projectFilters }
    })
}

export const updateprojectCategory = category => dispatch => {
    dispatch({
        type: Types.UPDATE_PROJECT_CATEGORY,
        payload:{ category }
    })
}

export const updateprojectRating = rating => dispatch => {
    console.log(rating);
    dispatch({
        type: Types.UPDATE_RATING,
        payload: rating 
    })
}