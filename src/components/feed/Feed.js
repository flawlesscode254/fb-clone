import React, { useEffect, useState } from 'react'
import './Feed.css'
import PostCreator from '../postCreator/PostCreator'
import Post from '../post/Post'
import db from '../../Firebase'

function Feed() {
    const [posts, setPosts] = useState([])

    // Listener for fetching data from the database
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
            {/*Displays the component where you can type a post*/}
            <PostCreator />
            {/*Displays the posts*/}
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    profilePic={post.data.profilePic}
                    message={post.data.message}
                    timestamp={post.data.timestamp}
                    username={post.data.username}
                    image={post.data.image}
                    shared={post.data.shared}
                    sharedTitle={post.data.sharedTitle}
                    totalShares={post.data.totalShares}
                />
            ))}
        </div>
    )
}

export default Feed
