import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Comment.css"
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const Comment = forwardRef(({ comment, username, new_time, profile }, ref) => {
    // Checks whether user is logged in
  const [user] = useAuthState(auth);
  
  // Logic to filter out comments that have been prefixed with @.
  // This allows an individual to notify a person that they are replying to
  // Also, the person being replied to gets to know that someone replied to them.
  // The username follows the @ symbols and that username is colored red
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
            {/*Sender's profile picture*/}
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
              {/*Highlighted user name containing the @ symbol*/}
              <Typography style={{
                  marginRight: 10,
                  color: "red"
              }} color="white" variant="p" component="p">
                {col}
              </Typography>

              {/*The rest of the message separated from the highlighted one*/}
              <Typography color="white" variant="p" component="p">
                {one.join(" ")}
              </Typography>

            </div>
          </CardContent>
        </Card>
            {/*Sender's username. If the sender is you, it will not show your username
            // but instead show "you"*/}
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
          {/*Time when the comment was sent formatted from the current time*/}
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

export default Comment;
