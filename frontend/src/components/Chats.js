import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase.js'
import person from '../images/Person.png'
import { Link } from 'react-router-dom'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import AddChat from './addChat'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import AddChatNoAdmin from './addChatNoAdmin.js';
import { getUser } from '../ApiServices/GetUser';
import { BsFillPeopleFill } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner"
var selectedChat = "";

function getCurrentChatId() {
  return selectedChat;
}

function setSelectedChat(chatId) {
  selectedChat = chatId;
}

function Chats() {
    const [user] = useAuthState(auth);
    const [chats, setChats] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);

    function getIsAdmin() {
        getUser(localStorage.getItem('email')).then(res => {
            setIsAdmin(res.result.isAdmin);
        })
    }
    useEffect(() => {
        getIsAdmin()
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                db.collection('chats').where("users", "array-contains", firebaseUser.email).onSnapshot(snapshot => {
                    setChats(snapshot.docs.map(doc => {

                        return({
                            id: doc.id,
                            ...doc.data(),

                        })
                    }))
                
                })

            }
        });



    }, [])
    



    return (
        <div>
            {user ? <><div className="contacts-page" style={{paddingBottom: "80px"}}>
                <div className="card-body contacts_body">
                    <ul className="contacts">
                        <li className="active">
                            {chats.map(({ id, name, users }) => (
                                <div key={id} className="list-group-flush" onClick={function (e) {
                                    setSelectedChat(id);
                                }}>
                                    <Link to="chat" style={{ textDecoration: 'none' }}>
                                        <div className="contact d-flex bd-highlight list-group-item list-group-item-action">
                                            <div className="img_cont">
                                                <img src={person} alt="PFP" className="rounded-circle user_img" />
                                                <span className="online_icon"></span>
                                            </div>
                                            <div className="user_info">
                                                <span>{name}</span>
                                                <p><BsFillPeopleFill/> {users.length}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
                {isAdmin ? <AddChat/> : <AddChatNoAdmin />}
            </div>
            
            </> : <><LoadingSpinner></LoadingSpinner></>}
            
            
            
        </div>
    )
}

export { getCurrentChatId, setSelectedChat };
export default Chats;
