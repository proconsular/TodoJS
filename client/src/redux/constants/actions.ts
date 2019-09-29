
export enum Actions {
    LOAD_SESSION,

    REQUEST_SIGNIN,
    REQUEST_SIGNUP,
    REQUEST_SIGNOUT,

    RECEIVE_SIGNIN,
    RECEIVE_SIGNOUT,

    REQUEST_USERS,
    RECEIVE_USERS,

    REQUEST_TASKS,
    RECEIVE_TASKS,

    EDIT_TASK,
    RECEIVE_TASK,

    REQUEST_CREATE_TASK,
    REQUEST_DELETE_TASK,

    REMOVE_TASK,
}

export const sendAction = (type: Actions, payload?: any, secure: boolean = false) => ({
    type: type.toString(),
    payload,
    secure,
})

export const sendStore = (type: Actions, payload?: any) => ({
    type: type,
    payload,
})