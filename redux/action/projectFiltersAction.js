import * as Types from '../constants/actionTypes'

export const updateProductFilters = projectFilters => dispatch => {
    dispatch({
        type: Types.UPDATE_PROJECT_FILTERS,
        payload:{ projectFilters }
    })
}

export const updateProductCategory = category => dispatch => {
    dispatch({
        type: Types.UPDATE_PROJECT_CATEGORY,
        payload:{ category }
    })
}

export const updateProductRating = rating => dispatch => {
    console.log(rating);
    dispatch({
        type: Types.UPDATE_RATING,
        payload: rating 
    })
}