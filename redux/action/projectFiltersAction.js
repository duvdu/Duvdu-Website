import * as Types from '../constants/actionTypes'

export const updateProjectFilters = projectFilters => dispatch => {
    dispatch({
        type: Types.UPDATE_PROJECT_FILTERS,
        payload:{ projectFilters }
    })
}

export const updateProjectCategory = category => dispatch => {
    dispatch({
        type: Types.UPDATE_PROJECT_CATEGORY,
        payload:{ category }
    })
}

export const updateProjectRating = rating => dispatch => {
    console.log(rating);
    dispatch({
        type: Types.UPDATE_RATING,
        payload: rating 
    })
}