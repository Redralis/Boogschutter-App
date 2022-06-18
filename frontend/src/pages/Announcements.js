import React from 'react'
import AddAnnouncement from '../components/addAnnouncement.js';
import AnnouncementRoom from '../components/AnnouncementRoom.js';
import AuthChecker from '../components/AuthChecker.jsx';
import Navbar from '../components/Navbar'
function Announcements() {
    return (
        <div>
            <AuthChecker  ></AuthChecker>
            <Navbar />
            <AnnouncementRoom/>
            <AddAnnouncement/>
        </div>
    )
}

export default Announcements