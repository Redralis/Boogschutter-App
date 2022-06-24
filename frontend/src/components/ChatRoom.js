import React, { useState, useEffect } from 'react'
import {  db } from '../firebase/firebase'
import { getCurrentChatId } from './Chats'
import SendMessage from './SendMessage'
import BlockedSendMessage from './BlockedSendMessage'
import "../styles/Chat.css"
import { useNavigate } from "react-router-dom";
import { getUser } from '../ApiServices/GetUser';
function ChatRoom() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    function getIsAdmin() {
        getUser(localStorage.getItem('email')).then(res => {
            if (res.result.isAdmin || res.result.isTrainer || res.result.isMatchLeader) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setUserEmail(res.result.email)

        })
    }
    function handleScroll() {

        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    }
    let navigate = useNavigate();

    const [messages, setMessages] = useState([])
    const [currentChat, setCurrentChat] = useState([])
    useEffect(() => {
        getIsAdmin();

        db.collection('messages').where("chatId", "==", getCurrentChatId()).orderBy('sortBy','desc').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.slice(0).reverse().map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
            handleScroll();

        })
        if (getCurrentChatId() === "") {
            let path = `/contacts`;
            navigate(path);
        } else {
            db.collection('chats').doc(getCurrentChatId()).get()
                .then(snapshot => setCurrentChat(snapshot.data()))
        }

    }, [navigate])

    return (
        <div>
            {messages.map(({ id, text, email, createdAt, firstName, lastName }) => (
                <div key={id} className="msgs">
                    <div className='container'>
                        <div className='row '>
                            <p style={email === userEmail ? { textAlign: 'right' } : { textAlign: 'left' }} className='col-12 emailP'>{firstName + " " + lastName}</p>
                        </div>
                        <div key={id} className={`row`}>
                            <div className={`msg  ${email === userEmail ? 'sent' : 'received'}`}>
                                <p className={'chatP col-12 '}>{text}</p>
                            </div>
                            <div className='col-12 dateP' style={email === userEmail ? { textAlign: 'right' } : { textAlign: 'left' }}>{createdAt}</div>
                        </div>

                     
                    </div>
                </div>

            
            ))}
            {isAdmin ? <SendMessage /> : <>{currentChat.usersCanSpeak ? <SendMessage /> : <BlockedSendMessage />}</>}

        </div>
    )
}

export default ChatRoom