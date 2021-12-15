import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import "./Post.css";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import db, {auth} from "./Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment"

function Post({ profilePic, image, username, timestamp, message, id, sharedTitle, shared, totalShares }) {
  const [messages, setMessages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user] = useAuthState(auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  const increment = firebase.firestore.FieldValue.increment(1)

  const onlyText = () => {
    db.collection("posts").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user?.photoURL,
      username: user?.displayName,
      shared: true,
      sharedTitle: `Shared from ${username}'s post`,
      totalShares: 0
    }).then(async () => {
      await db.collection("posts").doc(id).update({
        totalShares: increment
      })
      await handleClose()
    })
  }

  const onlyImage = () => {
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: image,
      shared: true,
      sharedTitle: `Shared from ${username}'s post`,
      totalShares: 0
    }).then(async () => {
      await db.collection("posts").doc(id).update({
        totalShares: increment
      })
      await handleClose()
    })
  }

  const both = () => {
    db.collection("posts").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: image,
      shared: true,
      sharedTitle: `Shared from ${username}'s post`,
      totalShares: 0
    }).then(async () => {
      await db.collection("posts").doc(id).update({
        totalShares: increment
      })
      await handleClose()
    })
  }

  const sharePost = () => {
    if (image && !message) {
      onlyImage()
    }
    else if (message && !image) {
      onlyText()
    }
    else if (message && image) {
      both()
    }
  }

  useEffect(() => {
    db.collection(id)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic ? profilePic : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ%26pid%3DApi&f=1"} className="post__avatar" />
        <div className="post__topInfo">
          {shared && (
            <p style={{
              color: "red",
              fontWeight: "bold",
              textAlign: "left"
            }}>{sharedTitle}</p>
          )}
          <h3 style={{
            textAlign: "left"
          }}>{username}</h3>
          <p style={{
            textAlign: "left"
          }}>{moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}</p>
        </div>
      </div>

      <div className="post__bottom">
        <p style={{
            textAlign: "left"
          }}>{message}</p>
      </div>

      <div className="post__image">
        <img src={image} alt="" />
      </div>

      <div className="post__options">
        <Link
          className="post__option"
          style={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          to={{
            pathname: "/comments",
            state: {
              id: id,
              username: username
            },
          }}
        >
          <ChatBubbleOutlineIcon />
          <p
            style={{
              marginLeft: 10,
            }}
          >
            {messages.length > 1 || messages.length === 0
              ? `${messages.length} Comments`
              : `${messages.length} Comment`}
          </p>
        </Link>

        <div onClick={handleClick} className="post__option">
          <NearMeIcon />
          <p
            style={{
              marginLeft: 10,
            }}
          >{totalShares === 0 || totalShares > 1 ? `${totalShares} Shares` : `${totalShares} Share`}</p>
        </div>
        <Popover
            id={ids}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <Button style={{
                marginRight: 20
              }} color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button color="primary" variant="outlined" onClick={sharePost}>Share</Button>
            </Typography>
          </Popover>
      </div>
    </div>
  );
}

export default Post;
