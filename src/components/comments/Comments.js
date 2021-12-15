import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Comments.css";
import "../postCreator/PostCreator.css";
import SendIcon from "@material-ui/icons/Send";
import db, { auth } from "../../Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";
import Comment from "../comment/Comment";

function Comments() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Listening for logged in user state
  const [user] = useAuthState(auth);

  // Fetchng data passed through route
  const location = useLocation();
  const { id, username } = location.state;

  // Reference to div that enables autosroll
  const dummy = useRef();

  // Listener for fetching data from the database
  useEffect(() => {
    db.collection(id)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      })
    // eslint-disable-next-line
  }, []);

  // Sending a comment
  const sendComment = (e) => {
    e.preventDefault();
    db.collection(id)
      .add({
        comment: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user?.photoURL,
        username: user?.displayName,
      })
      .then(async () => {
        await setInput("");
        // Implementation of auto scroll functionality for the chat
        await dummy.current.scrollIntoView({ behavior: "smooth" });
      });
  };

  return (
    <div className="App">
      {/*Title section containing the owner of the post*/}
      <p
        style={{
          color: "white",
        }}
      >
        {user?.displayName === username ? "Your Post" : `${username}'s Post`}
      </p>

        {/*div for passing data to the message component and also displaying them*/}
      <div style={{
        marginBottom: 100
      }}>
        {/*Allows for new comments to slide in in an animated way*/}
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Comment
              key={id}
              comment={data.comment}
              username={data.username}
              new_time={data.timestamp}
              profile={data.profilePic}
            />
          ))}
        </FlipMove>
        {/*Empty div for autoscroll*/}
        <div ref={dummy}></div>
      </div>

        {/*Writing and sending a comment*/}
      <div className="app__form">
        <div className="messageSender">
          <div className="messageSender__top">
            <form className="main-form" onSubmit={sendComment}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="messageSender__input"
                placeholder="Write a comment here.."
              />
              <div onClick={sendComment}>
                <SendIcon color="primary" className="sendIcon" />
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Comments;
