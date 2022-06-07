import React from 'react'
import {auth} from '../firebase/firebase.js'
import {useAuthState} from  'react-firebase-hooks/auth'
import Navbar from '../components/Navbar'
import ChatRoom from '../components/ChatRoom';

function Chat() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />
      <ChatRoom />
    </>
  )
}

export default Chat