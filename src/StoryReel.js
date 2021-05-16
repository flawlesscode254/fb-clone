import React from 'react'
import Story from './Story'
import './StoryReel.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'

function StoryReel() {
    const [user] = useAuthState(auth)

    return (
        <div className="storyReel">
            <Story
                image="https://content.fortune.com/wp-content/uploads/2016/06/13482877_10102910644965951_4268170000962807139_o-e1466628382259.jpg"
                profileSrc={user.photoURL}
                title={user.displayName}
            />
            <Story
                image="https://content.fortune.com/wp-content/uploads/2016/06/13482877_10102910644965951_4268170000962807139_o-e1466628382259.jpg"
                profileSrc={user.photoURL}
                title={user.displayName}
            />
            <Story
                image="https://content.fortune.com/wp-content/uploads/2016/06/13482877_10102910644965951_4268170000962807139_o-e1466628382259.jpg"
                profileSrc={user.photoURL}
                title={user.displayName}
            />
            <Story
                image="https://content.fortune.com/wp-content/uploads/2016/06/13482877_10102910644965951_4268170000962807139_o-e1466628382259.jpg"
                profileSrc={user.photoURL}
                title={user.displayName}
            />
            <Story
                image="https://content.fortune.com/wp-content/uploads/2016/06/13482877_10102910644965951_4268170000962807139_o-e1466628382259.jpg"
                profileSrc={user.photoURL}
                title={user.displayName}
            />
        </div>
    )
}

export default StoryReel
