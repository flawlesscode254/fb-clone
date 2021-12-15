import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const Message = forwardRef(({ comment, username, new_time, profile }, ref) => {
  const [user] = useAuthState(auth);
  return (
    <div className="main">
      <div ref={ref} className="message">
        <Card className="message__guestCard">
          <CardContent>
            <img className="profile" src={profile} alt="ims" />
            <Typography color="white" variant="p" component="p">
              {comment}
            </Typography>
          </CardContent>
        </Card>
        <p
          style={{
            color: "white",
            fontSize: 10,
            textAlign: "left",
          }}
        >
          {user?.displayName.toLowerCase() === username.toLowerCase()
            ? "You"
            : username}
        </p>
        <p
          style={{
            color: "white",
            fontSize: 10,
            textAlign: "left",
          }}
        >
          {moment(new Date(new_time?.toDate()).toUTCString()).fromNow()}
        </p>
      </div>
    </div>
  );
});

export default Message;
