import React from 'react'
import AddAnnouncement from '../components/addAnnouncement.js';
import AnnouncementRoom from '../components/AnnouncementRoom.js';
import AuthChecker from '../components/AuthChecker.jsx';
import Navbar from '../components/Navbar'
import { getUser } from '../ApiServices/GetUser';
import { useState, useEffect } from "react";
function Announcements() {
    

    const [isAdmin, setIsAdmin] = useState(false);
    const [isTrainer, setIsTrainer] = useState(false);
    const [isMatchLeader, setIsMatchLeader] = useState(false);

    function getIsAdmin() {
        getUser(localStorage.getItem('email')).then(res => {
            if (res.result.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }

        })
    }
    function getIsTrainer() {
        getUser(localStorage.getItem('email')).then(res => {
            if (res.result.isTrainer) {
                setIsTrainer(true);
            } else {
                setIsTrainer(false);
            }

        })
    }
    function getIsMatchLeader() {
        getUser(localStorage.getItem('email')).then(res => {
            if (res.result.isMatchLeader) {
                setIsMatchLeader(true);
            } else {
                setIsMatchLeader(false);
            }

        })
    }
    useEffect(() => {
        getIsAdmin();
        getIsTrainer()
        getIsMatchLeader()
    })

    function checkRoles(){
        if(isAdmin || isTrainer || isMatchLeader){
            return  (
                <AddAnnouncement/>
            )
        }
    }
    return (
        <div>
            <AuthChecker  ></AuthChecker>
            <Navbar />
            <AnnouncementRoom/>
            {checkRoles()}
            
        </div>
    )
}

export default Announcements