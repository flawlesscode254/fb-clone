import React from 'react';
import './App.css';
import Feed from './components/feed/Feed';
import Header from './components/header/Header';
import Login from './components/login/Login';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'

function Group() {
  const [user] = useAuthState(auth)

  return (
    <div className="app">
      {/*Checks whether a user is logged in 
      If user is not logged in, it renders the login component*/}
      {!user ? (
        <Login />
      ): (
      <>
      {/*This is rendered if the user is logged in*/}
          <Header />
          <div className="app__body">
            <Feed />
          </div>
        </>
      )}
    </div>
  );
}

export default Group;
