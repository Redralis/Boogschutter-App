import React from 'react'
import Navbar from '../components/Navbar'
import AdminChecker from '../components/AdminChecker'
import AuthChecker from '../components/AuthChecker.jsx';

function AdminPage() {
  return (
    <>
      <AdminChecker />
      <AuthChecker />
      <Navbar />
    </>
  )
}

export default AdminPage