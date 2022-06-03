import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'
import person from '../images/Person.png'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom'
import SignOut from './SignOut.js';

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

    useEffect(() => {
        db.collection('chats').where("users", "array-contains", user.email).onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [])



    return (
        <div>
            <head>
                {/* Start of Bootstrap imports */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous" />
                {/* End of Bootstrap imports */}
            </head>
            <div className="contacts-page">
                <div className="card-body contacts_body">
                    <ui className="contacts">
                        <li className="active">
                            {chats.map(({ id, name}) => (
                                <Link to="chat">
                                <div className="list-group-flush" onClick={function (e) {
                                    setSelectedChat(id);
                                  }}>
                                    <div className="contact d-flex bd-highlight list-group-item list-group-item-action">
                                        <div className="img_cont">
                                            <img src={person} className="rounded-circle user_img" />
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            <span>{name}</span>
                                            <p>Laatst gestuurde message</p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </li>
                    </ui>
                </div>
            </div>
            <SignOut/>
        </div>
    )
}

export { getCurrentChatId, setSelectedChat }
export default Chats