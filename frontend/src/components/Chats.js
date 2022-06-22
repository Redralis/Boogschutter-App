import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase.js'
import person from '../images/Person.png'
import { Link } from 'react-router-dom'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import AddChat from './addChat'
import AddChatNoAdmin from './addChatNoAdmin.js';
import { getUser } from '../ApiServices/GetUser';
import { BsFillPeopleFill } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner"
let selectedChat = "";

function getCurrentChatId() {
  return selectedChat;
}

function setSelectedChat(chatId) {
  selectedChat = chatId;
}

function Chats() {
    const user = auth.currentUser;
    const [chats, setChats] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);
    async function getIsAdmin() {
        getUser(localStorage.getItem('email')).then(res => {
            setIsAdmin(res.result.isAdmin);
            db.collection('chats').where("users", "array-contains", res.result.email).onSnapshot(snapshot => {
                setChats(snapshot.docs.map(doc => {

                    return({
                        id: doc.id,
                        ...doc.data(),

                    })
                }))
            
            })
        })
    }
    useEffect(() => {
        getIsAdmin()
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
