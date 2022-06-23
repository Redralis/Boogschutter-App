import React from 'react'
import Navbar from '../components/Navbar'
import AuthChecker from '../components/AuthChecker.jsx';
import ProfileComp from '../components/ProfileComp.js';

function Profile() {
  return (
    <>
      <AuthChecker />
      <Navbar />
      <ProfileComp />
    </>
  )
}

export default Profile