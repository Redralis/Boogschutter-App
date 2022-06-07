import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase.js'
import person from '../images/Person.png'
import { Link } from 'react-router-dom'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var selectedChat = "";

function getCurrentChatId() {
    return selectedChat;
}

function setSelectedChat(chatId) {
    selectedChat = chatId;
}

function Chats() {
    const [chats, setChats] = useState([])

    useEffect(() => {
        db.collection('chats').where("users", "array-contains", auth.currentUser.email).onSnapshot(snapshot => {
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
                            {chats.map(({ id, name }) => (
                                <div className="list-group-flush" onClick={function (e) {
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
                                                <p>Laatst gestuurde message</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </li>
                    </ui>
                </div>
            </div>
        </div>
    )
}

export { getCurrentChatId, setSelectedChat }
export default Chats