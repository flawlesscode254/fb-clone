import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react';
import './Message.css'

const Message = forwardRef(({ comment, username, new_time, profile }, ref) => {
    return (
        <div className='main'>
        <div ref={ref} className="message">
            <Card className="message__guestCard">
                <CardContent>
                    <img 
                        className='profile' 
                        src={profile} 
                        alt="ims" 
                    />
                    <Typography
                        color="white"
                        variant="p"
                        component="p"
                    >
                        {comment}
                    </Typography>
                </CardContent>
            </Card>
            {/* <p>{username}</p> */}
        </div>
        </div>
    )
})

export default Message