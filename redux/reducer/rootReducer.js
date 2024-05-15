import { combineReducers } from 'redux'
import projects from './project'
import projectFilters from './projectFilters'
import setting from './setting'
import auth from './auth'
import counter from './test'
import user from './user'
import api from './api'
import errors from './errorsType'
import addproject from './forms/addproject'
import categories from './categories'
import chats from './realTime/chat'
import messages from './realTime/messages'

const rootReducer = combineReducers({
    categories,
    setting,
    projects,
    addproject,
    auth,
    projectFilters,
    counter,
    user,
    chats,
    messages,
    api,
    errors,
})

export default rootReducer