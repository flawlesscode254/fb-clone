import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import "./Post.css";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import db, {auth} from "../../Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment"

function Post({ profilePic, image, username, timestamp, message, id, sharedTitle, shared, totalShares }) {
  const [messages, setMessages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Checks whether a user is logged in
  const [user] = useAuthState(auth);

  // Logic for pop up to choose when sharing a post
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Logic for closing the pop up when declining not to share a post
  const handleClose = () => {
    setAnchorEl(null);
  };

  // State to handle the pop up
  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  // Handles incrementing the number of shares on a post
  const increment = firebase.firestore.FieldValue.increment(1)

  // Logic for sharing a post that was only a text
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

  // Logic for sharing a post that was only an image
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

  // Logic for handling a post that was both a text and an image
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
    // If the image alone exists, it will call the onlyImage function
    if (image && !message) {
      onlyImage()
    }
    // If the text alone exists, it will call the onlyText function
    else if (message && !image) {
      onlyText()
    }
    // If both parts of the post exists, it will call the both function
    else if (message && image) {
      both()
    }
  }

  // Handles fetching of data from firebase
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

      {/*Displays the sender's profile picture
      If the post was shared, it will show that it was shared from the person who posted it
    Also shows the username and the time when the post was made formatted from now*/}
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

          {/*Shows the text part of the post*/}
      <div className="post__bottom">
        <p style={{
            textAlign: "left"
          }}>{message}</p>
      </div>

          {/*Shows the image part of a post*/}
      <div className="post__image">
        <img src={image} alt="" />
      </div>

          {/*Shows the comment and share icons*/}
      <div className="post__options">
          {/*Link to comments page when comments button is clicked*/}
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
          {/*Shows the number of comments*/}
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
          
          {/*When clicked, it shows the pop up when you want to share the post*/}
        <div onClick={handleClick} className="post__option">
          <NearMeIcon />
          {/*Shows the number of shares*/}
          <p
            style={{
              marginLeft: 10,
            }}
          >{totalShares === 0 || totalShares > 1 ? `${totalShares} Shares` : `${totalShares} Share`}</p>
        </div>
          {/*Pop up with cancel or share post*/}
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
              {/*Cancel sharing which closes the pop up
              Pop up can also be closed by clicking outside of it*/}
              <Button style={{
                marginRight: 20
              }} color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
              {/*Initiates the share function when clicked*/}
              <Button color="primary" variant="outlined" onClick={sharePost}>Share</Button>
            </Typography>
          </Popover>
      </div>
    </div>
  );
}

export default Post;
