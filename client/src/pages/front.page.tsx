import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { mergeStyleSets } from '@uifabric/merge-styles'

import { Task, Session } from '../redux/constants/types'
import { sendAction, Actions } from '../redux/constants/actions'

import TaskComp from '../components/Task.comp'
import CreateTaskComp from '../components/CreateTask.comp'
import EditTaskComp from '../components/EditTask.comp'

const getStyles = () => {
    return mergeStyleSets({
        main: {
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    })
}

const FrontPresentor = ({tasks} : {tasks: Task[]}) => {
    const [styles] = useState(getStyles())
    const [editId, setEditId] = useState(0)

    return (
        <div className={styles.main}>
            <CreateTaskComp />
            {tasks && tasks.sort((a, b) => {
                if (a.id < b.id)
                    return 1
                if (a.id > b.id)
                    return -1
                return 0
            }).map(task => {
                const callback = () => {
                    setEditId(0)
                }

                return (
                    <div>
                        {task.id !== editId ? (
                            <TaskComp key={task.id} {...{task}} {...{callback: () => setEditId(task.id)}} />
                        ) : (
                            <EditTaskComp key={task.id} {...{task}} {...{callback}} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const FrontController = ({session, tasks, getTasks} : {session: Session, tasks: {[index: number]: Task}, getTasks: Function}) => {
    
    useEffect(() => {
        if (session.online) {
            getTasks(session.id)
        }
    }, [session])

    return <FrontPresentor tasks={Object.values(tasks) as Task[]} />
}

const mTs = (state: any) => ({
    session: state.session,
    tasks: state.tasks
})

const mTd = (dispatch: Function) => ({
    getTasks: (userId: number) => dispatch(sendAction(Actions.REQUEST_TASKS, {userId}, true)),
    createTask: (task: Task) => dispatch(sendAction(Actions.REQUEST_CREATE_TASK, task)),
})

export default connect<any, any>(mTs, mTd)((props: any) => <FrontController {...props} />)