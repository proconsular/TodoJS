import { Actions } from "../constants/actions"
import { Session } from "../constants/types"

const INIT_STATE: Session = {
    id: 0,
    username: '',
    token: '',
    online: false
}

export default (state: Session = Object.assign({}, INIT_STATE), action: any) => {
    switch(action.type as Actions) {
        case Actions.LOAD_SESSION: {
            let data = localStorage.getItem('session')
            if (data) {
                return Object.assign({}, JSON.parse(data))
            }
            return state
        }
        case Actions.RECEIVE_SIGNIN: {
            let next = {
                ...action.payload,
                online: true,
            }
            localStorage.setItem('session', JSON.stringify(next))
            return next
        }
        case Actions.RECEIVE_SIGNOUT: {
            localStorage.removeItem('session')
            return Object.assign({}, INIT_STATE)
        }
        default:
            return state
    }
}