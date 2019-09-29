import React, { useState } from 'react'
import { sendAction, Actions } from '../redux/constants/actions'
import { connect } from 'react-redux'
import { FormStyle } from '../styles/form'


const SignupPresentor = ({submit} : {submit: Function}) => {
    const [styles] = useState(FormStyle())

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <div className={styles.panel}>
            <form onSubmit={e => {
                e.preventDefault()
                if (password === confirmPassword) {
                    submit(username, password)
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                }
            }}>
                <input type='text' value={username} placeholder={'Username'} onChange={e => setUsername(e.target.value)} />
                <input type='password' value={password} placeholder={'Password'} onChange={e => setPassword(e.target.value)} />
                <input type='password' value={confirmPassword} placeholder={'Retype Password'} onChange={e => setConfirmPassword(e.target.value)} />
                <input type='submit' value='Sign Up' />
            </form>
        </div>
    )
}

const SignupController = ({signup} : {signup: Function}) => {

    return <SignupPresentor submit={signup} />
}

const mapToState = (state: any) => ({
    
})

const mapToDispatch = (dispatch: Function) => ({
    signup: (username: string, password: string) => dispatch(sendAction(Actions.REQUEST_SIGNUP, {username, password}))
})

const container = (props: any) => (
    <SignupController {...props} />
)

export default connect<any, any>(mapToState, mapToDispatch)(container)