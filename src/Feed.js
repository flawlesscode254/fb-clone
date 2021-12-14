import React, { useEffect, useState } from 'react'
import './Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth } from './Firebase'
import db from './Firebase'

function Feed() {
    // const [user] = useAuthState(auth)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    }, [])

    return (
        <div className="feed">
            <MessageSender />
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    profilePic={post.data.profilePic}
                    message={post.data.message}
                    timestamp={post.data.timestamp}
                    username={post.data.username}
                    image={post.data.image}
                />
            ))}
        </div>
    )
}

export default Feed
