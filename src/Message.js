import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const Message = forwardRef(({ comment, username, new_time, profile }, ref) => {
  const [user] = useAuthState(auth);
  let col;
  let one = comment.split(" ");
  if (one[0].includes("@")) {
    let a = one.shift();
    col = a;
  }
  return (
    <div className="main">
      <div ref={ref} className="message">
        <Card className="message__guestCard">
          <CardContent>
            <img
              className="profile"
              src={
                profile
                  ? profile
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ%26pid%3DApi&f=1"
              }
              alt="ims"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography style={{
                  marginRight: 10,
                  color: "red"
              }} color="white" variant="p" component="p">
                {col}
              </Typography>
              <Typography color="white" variant="p" component="p">
                {one.join(" ")}
              </Typography>
            </div>
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
