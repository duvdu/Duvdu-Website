import * as Types from '../constants/actionTypes'
import { deleteProject, findProjectIndexById } from '../../util/util'
import storage from '../../util/localStorage'


const initialState = {
    modal: false,
    items: []
}

export default (state = initialState, action) => {

    let index = null

    switch (action.type) {

        case Types.OPEN_WISHLIST:

            return {
                ...state,
                modal: true
            }

        case Types.CLOSE_WISHLIST:

            return {
                ...state,
                modal: false
            }

        case Types.INIT_LOCALSTORAGE:

            return {
                ...state,
                items: [...action.payload.wishlist]
            }

        case Types.ADD_TO_WISHLIST:

            index = findProjectIndexById(state.items, action.payload.project.id)
            if (index !== -1) return state

            const items = [...state.items, action.payload.project]
            storage.set("dokani_wishlist", items)

            return {
                ...state,
                items
            }


        case Types.DELETE_FROM_WISHLIST:

            const list = deleteProject(state.items, action.payload.projectId)
            storage.set("dokani_wishlist", list)

            return {
                ...state,
                items: [...list]
            }

        case Types.CLEAR_WISHLIST:

            storage.set("dokani_wishlist", [])

            return {
                ...state,
                items: []
            }


        default:
            return state
    }
}