import { combineReducers } from 'redux'
import projects from './project'
import projectFilters from './projectFilters'
import setting from './setting'
import auth from './auth'
import counter from './test'
import api from './api'

const rootReducer = combineReducers({
    projects,
    setting,
    auth,
    projectFilters,
    counter,
    api,
})

export default rootReducer