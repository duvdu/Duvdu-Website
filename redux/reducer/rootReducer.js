import { combineReducers } from 'redux'
import projects from './project'
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
import ContractDetails from './contractDetails'

const rootReducer = combineReducers({
    categories,
    setting,
    projects,
    addproject,
    auth,
    counter,
    user,
    chats,
    messages,
    ContractDetails,
    api,
    errors,
})

export default rootReducer