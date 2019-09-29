import { takeLatest, put } from 'redux-saga/effects'

import { Actions, sendStore } from "../constants/actions"
import { Request, Methods } from "../helpers/request"

export function* createTask() {
    yield takeLatest(Actions.REQUEST_CREATE_TASK.toString(), function* (action: any) {
        try {
            let form = action.payload
            let request = new Request(Methods.post, '/api/tasks')
            request.setToken(action.token)
            let response = yield request.send(form)
            let json = yield response.json()
            if (json.error) {
                throw new Error(json)
            }
            yield put(sendStore(Actions.RECEIVE_TASK, json))
        } catch(err) {
            console.log(err)
        }
    })
}

export function* getTasks() {
    yield takeLatest(Actions.REQUEST_TASKS.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.get, `/api/tasks?userId=${action.payload.userId}`)
            request.setToken(action.token)
            let response = yield request.send()
            let json = yield response.json()
            if (json.error) {
                throw new Error(json)
            }
            yield put(sendStore(Actions.RECEIVE_TASKS, json))
        } catch(err) {
            console.log(err)
        }
    })
}

export function* editTask() {
    yield takeLatest(Actions.EDIT_TASK.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.put, `/api/tasks/${action.payload.id}`)
            request.setToken(action.token)
            let response = yield request.send(action.payload)
            if (!response.ok) {
                throw new Error(response.error)
            }
            yield put(sendStore(Actions.RECEIVE_TASK, action.payload))
        } catch(err) {
            console.log(err)
        }
    })
}

export function* deleteTask() {
    yield takeLatest(Actions.REQUEST_DELETE_TASK.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.delete, `/api/tasks/${action.payload.id}`)
            request.setToken(action.token)
            let response = yield request.send()
            if (!response.ok) {
                throw new Error(response)
            }
            yield put(sendStore(Actions.REMOVE_TASK, action.payload))
        } catch(err) {
            console.log(err)
        }
    })
}