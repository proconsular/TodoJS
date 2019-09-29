import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Actions, sendAction } from '../redux/constants/actions'
import { FormStyle } from '../styles/form'

const SigninPresentor = ({submit} : {submit: Function}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [styles] = useState(FormStyle())

    return (
        <div className={styles.panel}>
            <form onSubmit={e => {
                e.preventDefault()
                submit(username, password)
                setUsername('')
                setPassword('')
            }}>
                <input type='text' value={username} placeholder={'Username'} onChange={e => setUsername(e.target.value)} />
                <input type='password' value={password} placeholder={'Password'} onChange={e => setPassword(e.target.value)} />
                <input type='submit' value='Signin' />
            </form>
        </div>
    )
}

const SigninController = ({signin} : {signin: Function}) => {

    return <SigninPresentor submit={signin} />
}

const mapToState = (state: any) => ({

})

const mapToDispatch = (dispatch: Function) => ({
    signin: (username: string, password: string) => dispatch(sendAction(Actions.REQUEST_SIGNIN, {username, password}))
})

export default connect<any, any>(mapToState, mapToDispatch)((props: any) => <SigninController {...props} />)