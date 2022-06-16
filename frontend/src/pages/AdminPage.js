import React from 'react'
import Navbar from '../components/Navbar'
import AdminChecker from '../components/AdminChecker'
import AuthChecker from '../components/AuthChecker.jsx';
import UserDropdown from '../components/UserDropdown';

function AdminPage() {
  return (
    <>
      <AdminChecker />
      <AuthChecker />
      <Navbar />
      <UserDropdown />
    </>
  )
}

export default AdminPage