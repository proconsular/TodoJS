import { takeLatest, put } from 'redux-saga/effects'
import { Actions, sendAction, sendStore } from '../constants/actions'
import { Request, Methods } from '../helpers/request'

type SignupRequestForm = {
    username: string,
    password: string,
}

export function* signup() {
    yield takeLatest(Actions.REQUEST_SIGNUP.toString(), function* (action: any) {
        try {
            let form = action.payload
            let request = new Request(Methods.post, '/api/admission')
            let response = yield request.send(form)
            if (!response.ok) {
                throw new Error(response)
            }
            yield triggerSignin(action.payload.username, action.payload.password)
        } catch(err) {
            console.log(err)
        }
    })
}

function* triggerSignin(username: string, password: string) {
    try {
        let request = new Request(Methods.put, '/api/admission')
        let response = yield request.send({username, password})
        let json = yield response.json()
        if (json.error) {
            throw new Error(json)
        }
        yield put(sendStore(Actions.RECEIVE_SIGNIN, json))
    } catch(err) {
        console.log(err)
    }
}

export function* signin() {
    yield takeLatest(Actions.REQUEST_SIGNIN.toString(), function* (action: any) {
        yield triggerSignin(action.payload.username, action.payload.password)
    })
}

export function* signout() {
    yield takeLatest(Actions.REQUEST_SIGNOUT.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.delete, `/api/admission/${action.payload.id}`)
            let response = yield request.send()
            if (!response.ok) {
                throw new Error(response.status)
            }
            yield put(sendStore(Actions.RECEIVE_SIGNOUT))
        } catch(err) {
            console.log(err)
        }
    })
}