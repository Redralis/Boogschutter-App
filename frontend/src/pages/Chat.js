import React from 'react'
import Navbar from '../components/Navbar'
import ChatRoom from '../components/ChatRoom';
import AuthChecker from '../components/AuthChecker.jsx';
import "../styles/Chat.css"

function Chat() {

  return (
    <>
      <AuthChecker  ></AuthChecker>
      <Navbar />
      <ChatRoom />
    </>
  )
}

export default Chat