
import { db, auth } from '../firebase/firebase'
import React, { useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getCurrentChatId } from './Chats';

function SendMessage() {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        if (msg !== "") {
            const { email } = auth.currentUser
            let dateTime = new Date();
            var currentDate = dateTime.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
                hour12: false,
              })
            await db.collection('messages').add({
                chatId: getCurrentChatId(),
                text: msg,
                email,
                createdAt: currentDate,
                sortBy: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg('');
            handleScroll()
        }
    }

    function handleScroll() {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    }
    return (

        <div>

            <form onSubmit={sendMessage}>

                <div key="sendBar"className="container sendMessageContainer fixed-bottom">
                    <div className='row'>

                    </div>
                    <div className='row'>
                            {/* <input className='searchBar col-10' placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} /> */}
                            <input className='col-10 form-control searchBar center-block' type="text" name="message" placeholder="Type Message ..."  value={msg} onChange={e => setMsg(e.target.value)}></input>
                            <button type="submit" className="col-2 btn sendButton">Send</button>

                    </div>


                </div>
            </form>
        </div>




    )
}
export default SendMessage