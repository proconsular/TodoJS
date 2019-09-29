import { takeLatest, put } from 'redux-saga/effects'

import { Actions, sendStore } from "../constants/actions"
import { Methods, Request } from "../helpers/request"

export function* getUsers() {
    yield takeLatest(Actions.REQUEST_USERS.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.get, '/api/users')
            request.setToken(action.token)
            let response = yield request.send()
            let json = yield response.json()
            if (json.error) {
                throw new Error(json)
            }
            yield put(sendStore(Actions.RECEIVE_USERS, json))
        } catch(err) {
            console.log(err)
        }
    })
}
