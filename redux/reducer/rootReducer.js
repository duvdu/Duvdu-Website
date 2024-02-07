import { combineReducers } from 'redux'
import projects from './project'
import cart from './cart'
import wishlist from './wishlist'
import quickView from './quickView'
import compare from './compare'
import projectFilters from './projectFilters'

const rootReducer = combineReducers({
    projects,
    cart,
    wishlist,
    quickView,
    compare,
    projectFilters
})

export default rootReducer