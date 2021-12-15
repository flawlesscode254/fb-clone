import React from 'react'
import './Header.css'
import { Avatar, Button } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Firebase'
import icon from "../../files/Logo.png"

function Header() {
    const [user] = useAuthState(auth)

    // Function to sign out a user
    const handleLogout = () => {
        auth.signOut()
    }

    return (
        <div className="header">
            {/*Contains the website's icon or logo*/}
            <div className="header__left">
                <div className="header__info">
                    <img style={{
                        height: 30
                    }} src={icon} alt="icon" />
                </div>
            </div>
            {/*Contains the logged in user's name, profile picture and the log out button*/}
            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user?.photoURL ? user?.photoURL : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ%26pid%3DApi&f=1"} />
                    <h4>{user?.displayName}</h4>
                </div>
                <Button onClick={handleLogout} className='logout' color="secondary" variant='outlined' >Log Out</Button>
            </div>

        </div>
    )
}

export default Header
