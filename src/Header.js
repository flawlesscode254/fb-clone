import React from 'react'
import './Header.css'
import { Avatar, Button } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'
import icon from "./Untitled.png"

function Header() {
    const [user] = useAuthState(auth)

    const handleLogout = () => {
        auth.signOut()
    }

    return (
        <div className="header">
            <div className="header__right">
                <div className="header__info">
                    <img style={{
                        height: 30
                    }} src={icon} alt="icon" />
                </div>
            </div>
            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user?.photoURL} />
                    <h4>{user?.displayName}</h4>
                </div>
                <Button onClick={handleLogout} className='logout' color="secondary" variant='outlined' >Log Out</Button>
            </div>
        </div>
    )
}

export default Header
