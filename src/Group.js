import React from 'react';
import './App.css';
import Feed from './Feed';
import Header from './Header';
import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'

function Group() {
  const [user] = useAuthState(auth)

  return (
    <div className="app">
      {!user ? (
        <Login />
      ): (
      <>
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
