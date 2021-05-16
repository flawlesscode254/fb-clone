import React from 'react';
import './App.css';
import Feed from './Feed';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar'
import Widgets from './Widgets';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="app">
      {!user ? (
        <Login />
      ): (
      <>
          <Header />

          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
