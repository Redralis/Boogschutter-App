import React, { useState, useEffect, useRef } from 'react'
import { auth, db } from '../firebase/firebase'
import { getCurrentChatId } from './Chats'
import SendMessage from './SendMessage'

function ChatRoom() {
    const scroll = useRef()
    function loadMessages() {
        db.collection('messages').where("chatId", "==", getCurrentChatId()).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }
    const [messages, setMessages] = useState([])
    useEffect(() => {
        loadMessages();
    }, [])

    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, email }) => (
                    <div>
                        <div key={id} className={`msg ${email === auth.currentUser.email ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default ChatRoom