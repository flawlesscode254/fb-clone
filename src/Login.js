import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './Firebase'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
        })
        .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__logog">
                <img 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6SvVS5_vHsTH2DLa8n2J8wHaFi%26pid%3DApi&f=1" 
                    alt="" 
                />
            </div>
            <Button
                type="submit"
                onClick={signIn}
            >
                Sign In
            </Button>
        </div>
    )
}

export default Login
