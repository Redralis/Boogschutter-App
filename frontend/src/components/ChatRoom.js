import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase'
import { getCurrentChatId } from './Chats'
import SendMessage from './SendMessage'
import "../styles/Chat.css"
import { useNavigate } from "react-router-dom";
function ChatRoom() {
    let navigate = useNavigate();
    function loadMessages() {
        db.collection('messages').where("chatId", "==", getCurrentChatId()).orderBy('sortBy').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
        


    }

    const [messages, setMessages] = useState([])
    useEffect(() => {
        if(getCurrentChatId() === ""){
        let path = `/contacts`; 
        navigate(path);
        }
        loadMessages();
    }, [navigate])

    return (
        <div>
            {messages.map(({ id, text, email, createdAt }) => (
                <div key={id} className="msgs">
                    <div className='container'>
                        <div className='row '>
                            <p style={email === auth.currentUser.email ? { textAlign: 'right' } : { textAlign: 'left' }} className='col-12 emailP'>{email}</p>
                        </div>
                        <div key={id} className={`row`}>
                            <div className={`msg  ${email === auth.currentUser.email ? 'sent' : 'received'}`}>
                            <p className={'chatP col-12 '}>{text}</p>
                            </div>
                            <div className='col-12 dateP' style={email === auth.currentUser.email ? { textAlign: 'right' } : { textAlign: 'left' }}>{createdAt}</div>
                        </div>
                        

                    </div>
                </div>

            ))}

            <SendMessage />
        </div>
    )
}

export default ChatRoom