import React from 'react'
import addChatButton from "../images/addChat.png"
import "../styles/announcement.css"
import { getUser } from '../ApiServices/GetUser';
import { db, auth } from '../firebase/firebase'
import { useState, useRef } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function AddAnnouncement() {



    const [msg, setMsg] = useState('')
    const [poll, setPoll] = useState('')
    const Admins = useRef();
    const Trainers = useRef();
    const matchleaders = useRef();

    async function handleSubmit(e) {
        e.preventDefault()
        const { email } = auth.currentUser
        const userDetails = await getUser(email);
        let dateTime = new Date();
        var currentDate = dateTime.toLocaleString('nl-nl', {
            dateStyle: 'medium',
            timeStyle: 'short',
            hour12: false,
        })
        if (msg !== "") {
            if (Admins.current.checked || Trainers.current.checked || matchleaders.current.checked) {
                await db.collection('announcements').add({
                    text: msg,
                    poll: poll,
                    firstName: userDetails.result.firstName,
                    lastName: userDetails.result.lastName,
                    email,
                    forAdmin: Admins.current.checked,
                    forMatchLeader: matchleaders.current.checked,
                    forTrainer: Trainers.current.checked,
                    forMember: false,
                    createdAt: currentDate,
                    sortBy: firebase.firestore.FieldValue.serverTimestamp()
                })
            }else{
                await db.collection('announcements').add({
                    text: msg,
                    poll: poll,
                    firstName: userDetails.result.firstName,
                    lastName: userDetails.result.lastName,
                    email,
                    forAdmin: false,
                    forMatchLeader: false,
                    forTrainer: false,
                    forMember: true,
                    createdAt: currentDate,
                    sortBy: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
            setMsg('');
        }
    }
    return (
        <>
            <div className='fixed-bottom'>
                <img className='addAnnouncement' alt='addingChat' src={addChatButton} data-toggle="modal" data-target="#exampleModalCenter"></img>
            </div>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Mededeling versturen</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Mededeling</label>
                                    <textarea className="form-control" id="announcement" rows="3" placeholder="Type Mededeling..." value={msg} onChange={e => setMsg(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Link naar poll</label>
                                    <input type="text" className="form-control" id="poll"placeholder="https://mijnpoll.com/12345..." value={poll} onChange={e => setPoll(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Limiteer Doelgroep {("(leeg is alle leden)")}</label>
                                    <div className="form-check " style={{ padding: 0 }}>
                                        <input type="checkbox" ref={Admins} />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Beheerders
                                        </label>
                                    </div>
                                    <div className="form-check " style={{ padding: 0 }}>
                                        <input type="checkbox" ref={Trainers} />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Trainers
                                        </label>
                                    </div>
                                    <div className="form-check " style={{ padding: 0 }}>
                                        <input type="checkbox" ref={matchleaders} />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Wedstrijd Leiders
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary addButton">Versturen</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddAnnouncement