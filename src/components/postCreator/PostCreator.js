import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./PostCreator.css";
import SendIcon from "@material-ui/icons/Send";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth, store } from "../../Firebase";
import firebase from "firebase";

function PostCreator() {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState();
  const [user] = useAuthState(auth);
  const [image, setImage] = useState(null);

  // Handles the selection of a file that is being chosen for upload
  // For now it only supports image files
  const handleFile = async (e) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };

  // Handles the scenario where you are only sending a text post
  const onlyText = () => {
    db.collection("posts").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user.photoURL,
        username: user.displayName,
        shared: false,
        totalShares: 0
      });
      setInput("");
      setCurrent("");
  }

  // Handles the scenario where you are only sending an image post
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
              shared: false,
              totalShares: 0
            });
            setImage(null);
            setInput("");
            setCurrent("");
          });
      }
    );
  }

  // Handles the scenario where you are sending both a text and an image post
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
              shared: false,
              totalShares: 0
            });
            setImage(null);
            setInput("");
            setCurrent("");
          });
      }
    );
  }

  // Handles the sending of the post that you have created
  const handleSubmit = (e) => {
    e.preventDefault();
    // If the input alone which in this case is a text has been created, it calls the onlyText function
    if (input && !image) {
        onlyText()
    }
    // If the image alone has been created, it calls the onlyImage function
    else if (image && !input) {
        onlyImage()
    }
    // If both parts of the post are present, it will call the both function
    else if (image && input) {
        both()
    }
  };

  return (
    <div className="messageSender">
      {/*Contains your profile picture, the input for text and the send button*/}
      <div className="messageSender__top">
        <Avatar src={user?.photoURL} />
        <form className="main-form" onSubmit={handleSubmit}>
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

      {/*Contains the photo icon, the file input and an upload progress indicator*/}
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
          <h3>File</h3>
        </div>
          {/*Shows the upload progress as a percentage*/}
        {current > 0 && (
          <div className="messageSender__option">
            <p>{`${current} %`}</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default PostCreator;
