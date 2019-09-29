import React, { useState } from 'react'
import { connect } from 'react-redux'
import { mergeStyleSets } from '@uifabric/merge-styles'
import { sendAction, Actions } from '../redux/constants/actions'
import { Session } from '../redux/constants/types'

type Children = JSX.Element[] | JSX.Element

const getStyles = () => {
    return mergeStyleSets({
        main: {
        },
        frame: {
            background: '#333',
            color: '#eee',
            padding: 8,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 24,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        session: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            fontSize: 24,
        },
        content: {
            padding: 16,
        },
        dropdown: {
            position: 'relative',
            display: 'inline-block',
        },
        dropdownContent: {
            position: 'absolute',
            background: '#111',
            width: 200,
            right: -16,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            selectors: {
                'button': {
                    width: '100%',
                    textAlign: 'left',
                    padding: 8,
                    paddingLeft: 24,
                    background: '#555',
                    border: 'none',
                    color: '#eee',
                    fontSize: 16,
                    cursor: 'pointer',
                    selectors: {
                        ':hover': {
                            background: '#777',
                            textDecoration: 'underline',
                        }
                    }
                }
            }
        },
    })
}

const FramePresentor = ({session, signOut, children} : {session: Session, signOut: Function, children: Children}) => {
    const [styles] = useState(getStyles())
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div className={styles.main}>
            <div className={styles.frame} onMouseEnter={() => setShowDropdown(true)}>
                <div>
                    Todo
                </div>
                {session.online && (
                    <div className={styles.session}>
                        <div className={styles.dropdown}>
                            {session.username}
                            {showDropdown && (
                                <div className={styles.dropdownContent}>
                                    <button onClick={() => signOut(session.id)}>Sign Out</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.content} onMouseEnter={() => setShowDropdown(false)} >
                {children}
            </div>
        </div>
    )
}

const FrameController = ({session, signOut, children} : {session: Session, signOut: Function, children: Children}) => {

    return (
        <FramePresentor session={session} signOut={signOut}>
            {children}
        </FramePresentor>
    )
}

const mTs = (state: any) => ({
    session: state.session
})

const mTd = (dispatch: Function) => ({
    signOut: (id: number) => dispatch(sendAction(Actions.REQUEST_SIGNOUT, {id}))
})

export default connect<any, any>(mTs, mTd)((props: any) => <FrameController {...props} />)