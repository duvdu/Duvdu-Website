import { combineReducers } from 'redux'
import projects from './project'
import mode from './mode.js'

const rootReducer = combineReducers({
    projects,
    mode,
    
})

export default rootReducer