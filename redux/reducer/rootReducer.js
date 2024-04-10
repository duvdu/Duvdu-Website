import { combineReducers } from 'redux'
import projects from './project'
import projectFilters from './projectFilters'
import setting from './setting'
import auth from './auth'
import counter from './test'

const rootReducer = combineReducers({
    projects,
    setting,
    auth,
    projectFilters,
    counter,
})

export default rootReducer