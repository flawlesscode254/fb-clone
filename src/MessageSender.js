import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './MessageSender.css'
import VideoCamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, store } from './Firebase'
import db from './Firebase'
import firebase from 'firebase'

function MessageSender() {
    const [input, setInput] = useState('')
    const [user] = useAuthState(auth)
    const[image, setImage] = useState(null)

    const handleFile = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadTask = store.ref(`images/${image.name}`).put(image)
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
            )
            console.log(progress);
        },
        (error) => {
            console.log(error)
            alert(error.message)
        },
        () => {
            store
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                db.collection("posts").add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    profilePic: user.photoURL,
                    username: user.displayName,
                    image: url
                })
                setImage(null)
                setInput('')
            })
        }
    )
    }

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={user.photoURL} />
                <form>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="messageSender__input" 
                        placeholder="What's on your mind?" 
                    />
                    <button onClick={handleSubmit} type="submit" >
                        Hidden Submit
                    </button>
                </form>
            </div>

            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideoCamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>
                <div className="messageSender__option">
                    <label htmlFor="file-input">
                        <PhotoLibraryIcon style={{ color: "green", cursor: "pointer" }} />
                    </label>
                    <input id="file-input" type="file" accept=".gif, .png, .jpeg" onChange={handleFile} hidden/>
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
