import React from 'react'
import { connect } from 'react-redux'

import { Session, Task } from '../redux/constants/types'
import { sendAction, Actions } from '../redux/constants/actions'
import { TaskFormPresentor } from './Task.form'

const EditTaskController = ({task, editTask, callback} : {task: Task, editTask: Function, callback: Function}) => {
    return <TaskFormPresentor presetName={task.name} symbol={'check'} submit={(name: string) => {
        editTask({...task, name})
        callback()
    }} />
}

const mTs = (state: any) => ({

})

const mTd = (dispatch: Function) => ({
    editTask: (task: Task) => dispatch(sendAction(Actions.EDIT_TASK, task, true))
})

export default connect<any, any>(mTs, mTd)((props: any) => <EditTaskController {...props} />)