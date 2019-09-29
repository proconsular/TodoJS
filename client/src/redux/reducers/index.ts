import { combineReducers } from 'redux'

import session from './session'
import users from './users'
import tasks from './tasks'

export default combineReducers({
    session,
    users,
    tasks,
})