import React, { useState } from 'react'

import Signup from '../components/Signup.comp'
import Signin from '../components/Signin.comp'
import { mergeStyleSets } from '@uifabric/merge-styles'

const getStyles = () => {
    return mergeStyleSets({
        toggle: {
            textAlign: 'center',
            marginTop: 16,
            selectors: {
                'button': {
                    fontSize: 18,
                    border: '2px solid #333',
                    background: 'none',
                    color: '#111',
                    padding: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    borderRadius: 8,
                    selectors: {
                        ':hover': {
                            background: '#333',
                            color: '#eee',
                        }
                    }
                }
            }
        }
    })
}

export const SignPage = () => {
    const [showSignup, setShowSignup] = useState(false)

    const [styles] = useState(getStyles())

    return (
        <div>
            <div>
                {showSignup ? <Signup /> : <Signin />}
            </div>
            <div className={styles.toggle}>
                <button onClick={() => setShowSignup(!showSignup)}>{showSignup ? 'Already have an account?' : 'Don\'t have an account?'}</button>
            </div>
        </div>
    )
}