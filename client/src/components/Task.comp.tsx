import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Task } from '../redux/constants/types'
import { mergeStyleSets } from '@uifabric/merge-styles'

import classnames from 'classnames'
import { sendAction, Actions } from '../redux/constants/actions'
import { TaskStyle } from '../styles/task'

const getStyles = () => {
    return mergeStyleSets({
        ...TaskStyle(),
        complete: {
            padding: 0,
            boxSizing: 'border-box',
            marginRight: 24,
        },
        green: {
            color: 'green',
        },
        options: {
            display: 'flex',
            alignItems: 'center',
        },
        remove: {
            marginLeft: 8,
            color: '#a33',
            cursor: 'pointer',
            selectors: {
                'i': {
                    fontSize: 46,
                },
                'i:hover': {
                    background: '#222',
                    color: '#e55',
                    borderRadius: 4,
                }
            }
        }
    })
}

let icons = ["check", "panorama_fish_eye"]

const TaskPresentor = ({task, setDone, remove, callback} : {task: Task, setDone: Function, remove: Function, callback: Function}) => {
    const [styles] = useState(getStyles())
    const [icon, setIcon] = useState(task.complete ? 0 : 1)

    return (
        <div className={styles.task}>
            <div className={styles.options}>
                <div className={styles.complete} onMouseEnter={e => setIcon(task.complete ? 1 : 0)} onMouseLeave={e => setIcon(task.complete ? 0 : 1)} onClick={() => setDone(!task.complete)}>
                    <i className={classnames(" material-icons", {[styles.green]: task.complete})}>{icons[icon]}</i>
                </div>
                <div onClick={() => callback(task)}>
                    {task.name}
                </div>
            </div>
            <div className={styles.remove} onClick={() => remove(task.id)}>
                <i className={"material-icons"}>close</i>
            </div>
        </div>
    )
}

const TaskController = ({task, editTask, deleteTask, callback} : {task: Task, editTask: Function, deleteTask: Function, callback: Function}) => {

    return <TaskPresentor task={task} setDone={(done: boolean) => editTask({...task, complete: done})} remove={deleteTask} callback={callback} />
}

const mTs = (state: any) => ({

})

const mTd = (dispatch: Function) => ({
    editTask: (task: Task) => dispatch(sendAction(Actions.EDIT_TASK, task, true)),
    deleteTask: (id: number) => dispatch(sendAction(Actions.REQUEST_DELETE_TASK, {id}, true))
})

export default connect<any, any>(mTs, mTd)((props: any) => <TaskController {...props} />)