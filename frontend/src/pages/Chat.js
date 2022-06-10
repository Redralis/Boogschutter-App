import React from 'react'
import {auth} from '../firebase/firebase.js'
import {useAuthState} from  'react-firebase-hooks/auth'
import Navbar from '../components/Navbar'
import ChatRoom from '../components/ChatRoom';
import { jwtContext } from 'react';
import AuthChecker from '../components/AuthChecker.jsx';
import "../styles/Chat.css"

function Chat() {
  const [user] = useAuthState(auth);

  return (
    <>
      <AuthChecker  ></AuthChecker>
      <Navbar />
      <ChatRoom />
    </>
  )
}

export default Chat