import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Comments.css";
import "./MessageSender.css";
import SendIcon from "@material-ui/icons/Send";
import db, {auth} from "./Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from 'react-flip-move';
import Message from "./Message";

function Comments() {
  const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
  
  const [user] = useAuthState(auth);
  const location = useLocation();
  const { id, username } = location.state;

  useEffect(() => {
    db.collection(id)
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data()
        })))
    }) 
        
}, [] )

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection(id).add({
      comment: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName
    }).then(() => {
      setInput("")
    })
  }

  return (
    <div className="App">
        <p>{user.displayName === username ? "Your Post" : `${username}'s Post`}</p>
      <div className="app__form">
        <div className="messageSender">
          <div className="messageSender__top">
            <form className="main-form">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="messageSender__input"
                placeholder="Write a comment here.."
              />
              <div onClick={sendMessage}>
                <SendIcon color="primary" className="sendIcon" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <FlipMove>
        {
          messages.map(({id, data}) => (
            <Message 
            key={id} 
            comment={data.comment}
            username={data.username}
            new_time={data.timestamp}
            profile={data.profilePic}
            />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default Comments;
