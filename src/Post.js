import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import "./Post.css";
import { Link } from "react-router-dom";
import db from "./Firebase";

function Post({ profilePic, image, username, timestamp, message, id }) {
  const [messages, setMessages] = useState([]);

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
  }, []);
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
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
              flexDirection: "row"
            }}
            to={{
              pathname: "/comments",
              state: {
                id: id,
                username: username,
              },
            }}
          >
            <ChatBubbleOutlineIcon />
            <p style={{ 
              marginLeft: 10
             }}>{`${messages.length} Comments`}</p>
          </Link>

          <Link
          className="post__option"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
            to={{
              pathname: "/comments",
              state: {
                id: id,
                username: username,
              },
            }}
          >
            <NearMeIcon />
            <p style={{ 
              marginLeft: 10
             }}>{`${messages.length} Shares`}</p>
          </Link>
      </div>
    </div>
  );
}

export default Post;
