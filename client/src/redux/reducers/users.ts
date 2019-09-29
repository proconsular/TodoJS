import { Actions } from '../constants/actions'

export default (state: any[] = [], action: any) => {
    switch (action.type as Actions) {
        case Actions.RECEIVE_USERS: {
            return Object.assign([], action.payload)
        }
        default:
            return state
    }
}