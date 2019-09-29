import React, { useState } from 'react'
import { TaskStyle } from '../styles/task'
import { mergeStyleSets } from '@uifabric/merge-styles'

const getStyles = () => {
    return mergeStyleSets({
        ...TaskStyle(),
        taskForm: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            boxSizing: 'border-box',
            alignItems: 'baseline',
            selectors: {
                'input': {
                    background: 'none',
                    border: 'none',
                    fontSize: 32,
                    boxSizing: 'border-box',
                    
                },
                'input[type="text"]': {
                    borderBottom: '2px solid #aaa',
                    padding: 0,
                    height: '70%',
                    width: '90%',
                },
                'button': {
                    background: 'none',
                    border: '2px solid #aaa',
                    // border: 'none',
                    color: '#444',
                    boxSizing: 'border-box',
                    padding: 0,
                    margin: 0,
                    borderRadius: 4,
                    width: 46,
                    height: 46,
                    selectors: {
                        ':hover': {
                            background: '#111',
                            color: '#eee',
                            border: '2px solid #111',
                            cursor: 'pointer',
                        }
                    }
                }
            }
        },
    })
}

export const TaskFormPresentor = ({presetName = '', symbol = 'add', submit} : {presetName: string, symbol: string, submit: Function}) => {
    const [styles] = useState(getStyles())
    
    const [name, setName] = useState(presetName)

    return (
        <div className={styles.task}>
            <form className={styles.taskForm} onSubmit={e => {
                e.preventDefault()
                if (name.length > 0) {
                    submit(name)
                    setName('')
                }
            }}>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />
                <button type='submit'><i className="material-icons">{symbol}</i></button>
            </form>
        </div>
    )
}