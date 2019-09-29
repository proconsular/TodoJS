import React, { useEffect } from 'react'

import { SignPage } from './Sign-in.page'
import { sendAction, Actions, sendStore } from '../redux/constants/actions'
import { connect } from 'react-redux'
import FrameComp from '../components/Frame.comp'
import { Session } from '../redux/constants/types'

import FrontComp from '../pages/front.page'

const Main = ({session, loadSession, signout, getUsers, users} : {session: Session, loadSession: Function, signout: Function, getUsers: Function, users: any[]}) => {

    useEffect(() => {
        loadSession()
    }, [])

    useEffect(() => {
        if (session.online) {
            getUsers()
        }
    }, [session])

    return (
        <FrameComp>
            {session.online ? (
                <FrontComp />
            ) : (
                <SignPage /> 
            )}
        </FrameComp>
    )
}

const mapToState = (state: any) => ({
    session: state.session,
    users: state.users
})

const mapToDispatch = (dispatch: Function) => ({
    loadSession: () => dispatch(sendStore(Actions.LOAD_SESSION)),
    signout: (id: number) => dispatch(sendAction(Actions.REQUEST_SIGNOUT, {id})),
    getUsers: () => dispatch(sendAction(Actions.REQUEST_USERS, {}, true))
})

const container = (props: any) => (
    <Main {...props} />
)

export default connect<any, any>(mapToState, mapToDispatch)(container)