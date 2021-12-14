import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./MessageSender.css";
import SendIcon from "@material-ui/icons/Send";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, store } from "./Firebase";
import db from "./Firebase";
import firebase from "firebase";

function MessageSender() {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState();
  const [user] = useAuthState(auth);
  const [image, setImage] = useState(null);

  const handleFile = async (e) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };

  const onlyText = () => {
    db.collection("posts").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user.photoURL,
        username: user.displayName
      });
      setInput("");
      setCurrent("");
  }

  const onlyImage = () => {
    const uploadTask = store.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setCurrent(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        store
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.photoURL,
              username: user.displayName,
              image: url,
            });
            setImage(null);
            setInput("");
            setCurrent("");
          });
      }
    );
  }

  const both = () => {
    const uploadTask = store.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setCurrent(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        store
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              message: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.photoURL,
              username: user.displayName,
              image: url,
              totalShares: 0
            });
            setImage(null);
            setInput("");
            setCurrent("");
          });
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input && !image) {
        onlyText()
    }
    else if (image && !input) {
        onlyImage()
    }
    else if (image && input) {
        both()
    }
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user?.photoURL} />
        <form className="main-form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender__input"
            placeholder="Write a post here.."
          />
            <SendIcon
                color="primary"
                className="sendIcon"
                onClick={handleSubmit}
            />
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <label htmlFor="file-input">
            <PhotoLibraryIcon
              style={{
                color: "green",
                cursor: "pointer",
              }}
            />
          </label>
          <input
            id="file-input"
            type="file"
            accept=".gif, .png, .jpeg, .jpg"
            onChange={handleFile}
            hidden
          />
          <h3>Photo</h3>
        </div>
        {current > 0 && (
          <div className="messageSender__option">
            <p>{`${current} %`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageSender;
