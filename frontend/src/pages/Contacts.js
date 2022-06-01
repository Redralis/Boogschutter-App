import React from 'react';
import '../styles/Contacts.css';
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import AddContact from '../components/AddContact'
import ContactList from '../components/ContactList'

export default function Chats() {
    return (
      <>
        <Navbar />
        <Header />
        <AddContact />
        {/* <ContactList /> */}
      </>
    );
}