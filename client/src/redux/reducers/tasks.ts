import { Task } from '../constants/types'
import { Actions } from '../constants/actions'

export default (state: {[index: number]: Task} = {}, action: any) => {
    switch (action.type as Actions) {
        case Actions.RECEIVE_TASKS: {
            let next: {[index: number]: Task} = {}
            const tasks = action.payload as Task[]
            for (const task of tasks) {
                next = {
                    ...next,
                    [task.id]: task
                }
            }
            return next
        }
        case Actions.RECEIVE_TASK: {
            let task = Object.assign({}, action.payload) as Task
            let next = {
                ...state,
                [task.id]: task
            }
            return next
        }
        case Actions.REMOVE_TASK: {
            let next = Object.assign({}, state)
            delete next[action.payload.id]
            return next
        }
        default:
            return state
    }
}