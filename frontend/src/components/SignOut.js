
import React from 'react'
import { auth } from '../firebase/firebase'
import Button from 'react-bootstrap/Button';
import { setSelectedChat } from './Chats';
function SignOut() {
  return (
    <div>
      <Button variant="primary" onClick={function (e) {
        setSelectedChat("")
        auth.signOut();
      }}>Sign Out</Button>{' '}
    </div>
  )
}

export default SignOut