import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase'
import { getCurrentChatId } from './Chats'
import SendMessage from './SendMessage'
import BlockedSendMessage from './BlockedSendMessage'
import "../styles/Chat.css"
import { useNavigate } from "react-router-dom";
import { getUser } from '../ApiServices/GetUser';
import "../styles/announcement.css"
import * as BsIcons from 'react-icons/bs'

function AnnouncementRoom() {
    const [announcements, setAnnouncements] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTrainer, setIsTrainer] = useState(false);
    const [isMatchLeader, setIsMatchLeader] = useState(false);
    function getIsAdmin() {
        getUser(localStorage.getItem('mail')).then(res => {
            if (res.result.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }

        })
    }
    function getIsTrainer() {
        getUser(localStorage.getItem('mail')).then(res => {
            if (res.result.isTrainer) {
                setIsTrainer(true);
            } else {
                setIsTrainer(false);
            }

        })
    }
    function getIsMatchLeader() {
        getUser(localStorage.getItem('mail')).then(res => {
            if (res.result.isMatchLeader) {
                setIsMatchLeader(true);
            } else {
                setIsMatchLeader(false);
            }

        })
    }
    function meantFor(forAdmin, forTrainer, forMatchLeader, forMember) {
        var arr = [];
        if (forAdmin) {
            arr.push("Beheerders")
        }
        if (forTrainer) {
            arr.push("Trainers")
        }
        if (forMatchLeader) {
            arr.push("Wedstrijd Leiders")
        }
        if (forMember) {
            arr.push("Alle Leden")
        }
        return arr
    }
    function getAnnouncements(id, text, email, createdAt, firstName, lastName, forAdmin, forTrainer, forMatchLeader, forMember) {
        var showFor = meantFor(forAdmin, forTrainer, forMatchLeader, forMember);
        if (showFor.length === 1) {
            if (isAdmin && showFor[0] === "Beheerders") {
                return (
                    <div key={id} className="alert alert-admin">
                        <div className='container'>
                            <div className='row announcementIcon'>
                                <div className='col-1 '>
                                    <BsIcons.BsFillMegaphoneFill style />
                                </div>
                                <div className='col-11 p-0'>
                                    <div className="container">
                                        <div className="alert-icon row">
                                            <i className=" col">@{firstName + " " + lastName}</i>
                                        </div>
                                        <div className='row'>
                                            <b className='col'>Bestemd voor beheerders</b>
                                            </div>
                                            <div className='textAnn'>{text}</div>
                                            <div className='createdAtAnn'>{createdAt}</div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                )
            }
            if (isTrainer && showFor[0] === "Trainers") {
                return (
                    <div key={id} className="alert alert-matchleader">
                        <div className='container'>
                            <div className='row announcementIcon'>
                                <div className='col-1 '>
                                    <BsIcons.BsFillMegaphoneFill style />
                                </div>
                                <div className='col-11 p-0'>
                                    <div className="container">
                                        <div className="alert-icon row">
                                            <i className=" col">@{firstName + " " + lastName}</i>
                                        </div>
                                        <div className='row'>
                                            <b className='col'>Bestemd voor trainers</b></div> <div className='textAnn'>{text}</div>
                                            <div className='createdAtAnn'>{createdAt}</div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                )
            }
            if (isMatchLeader && showFor[0] === "Wedstrijd Leiders") {
                return (
                    <div key={id} className="alert alert-trainer">
                        <div className='container'>
                            <div className='row announcementIcon'>
                                <div className='col-1 '>
                                    <BsIcons.BsFillMegaphoneFill style />
                                </div>
                                <div className='col-11 p-0'>
                                    <div className="container">
                                        <div className="alert-icon row">
                                            <i className=" col">@{firstName + " " + lastName}</i>
                                        </div>
                                        <div className='row'>
                                            <b className='col'>Bestemd voor wedstrijd leiders</b></div> <div className='textAnn'>{text}</div>
                                            <div className='createdAtAnn'>{createdAt}</div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                )
            }
            if (showFor[0] === "Alle Leden") {
                return (
                    <div key={id} className="alert alert-allmembers">
                        <div className='container'>
                            <div className='row announcementIcon'>
                                <div className='col-1 '>
                                    <BsIcons.BsFillMegaphoneFill style />
                                </div>
                                <div className='col-11 p-0'>
                                    <div className="container">
                                        <div className="alert-icon row">
                                            <i className=" col">@{firstName + " " + lastName}</i>
                                        </div>
                                        <div className='row'>
                                            <b className='col'>Bestemd voor alle leden</b></div> <div className='textAnn'>{text}</div>
                                            <div className='createdAtAnn'>{createdAt}</div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                )
            }
        } else {
            if (isAdmin || isMatchLeader || isTrainer) {
                if (showFor.includes("Beheerders") && isAdmin || showFor.includes("Trainers") && isTrainer || showFor.includes("Wedstrijd Leiders") && isMatchLeader) {
                    return (<div key={id} className="alert alert-other ">
                        <div className='container '>
                            <div className='row announcementIcon'>
                                <div className='col-1 '>
                                    <BsIcons.BsFillMegaphoneFill style />
                                </div>
                                <div className='col-11 p-0'>
                                    <div className="container">
                                        <div className="alert-icon row">
                                            <i className=" col">@{firstName + " " + lastName}</i>
                                        </div>
                                        <div className='row'>
                                            <b className='col'>Bestemd voor {showFor.map((item, index, array) => {
                                                if (index < array.length - 2) {
                                                    return (item + ", ")
                                                } else if (index == array.length - 2) {
                                                    return (item + " en ")
                                                } else {
                                                    return (item + ".")
                                                }
                                            })}</b></div> <div className='textAnn'>{text}</div>
                                            <div className='createdAtAnn'>{createdAt}</div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                    )
                }
            }
        }




    }

    useEffect(() => {
        getIsAdmin();
        getIsTrainer();
        getIsMatchLeader();
        db.collection('announcements').orderBy('sortBy', 'desc').limit(10).onSnapshot(snapshot => {
            setAnnouncements(snapshot.docs.slice(0).reverse().map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [])
    return (
        <div className='containerAnn'>
            {announcements.map(({ id, text, email, createdAt, firstName, lastName, forAdmin, forTrainer, forMatchLeader, forMember }) => (
                getAnnouncements(id, text, email, createdAt, firstName, lastName, forAdmin, forTrainer, forMatchLeader, forMember)
            ))}
        </div>
    )
}

export default AnnouncementRoom