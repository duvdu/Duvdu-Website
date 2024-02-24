import { combineReducers } from 'redux'
import projects from './project'
import cart from './cart'
import wishlist from './wishlist'
import quickView from './quickView'
import compare from './compare'
import projectFilters from './projectFilters'
import counter from './test'

const rootReducer = combineReducers({
    projects,
    cart,
    wishlist,
    quickView,
    compare,
    projectFilters,
    counter,
})

export default rootReducer