import React from 'react'
import { connect } from 'react-redux'

import { Session } from '../redux/constants/types'
import { sendAction, Actions } from '../redux/constants/actions'
import { TaskFormPresentor } from './Task.form'

const CreateTaskController = ({session, createTask} : {session: Session, createTask: Function}) => {
    return <TaskFormPresentor presetName={''} symbol={'add'} submit={(name: string) => createTask(session.id, name)} />
}

const mTs = (state: any) => ({
    session: state.session
})

const mTd = (dispatch: Function) => ({
    createTask: (userId: number, name: string) => dispatch(sendAction(Actions.REQUEST_CREATE_TASK, {userId, name}, true))
})

export default connect<any, any>(mTs, mTd)((props: any) => <CreateTaskController {...props} />)