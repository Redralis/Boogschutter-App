
import { db} from '../firebase/firebase'
import React, { useState, useEffect} from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getCurrentChatId } from './Chats';
import { getUser } from '../ApiServices/GetUser';

function SendMessage() {
    const [userEmail, setUserEmail] = useState("");
    function getIsAdmin() {
        getUser(localStorage.getItem('email')).then(res => {
            setUserEmail(res.result.email)
        })
    }
    useEffect(() => {
        getIsAdmin()
    }, [])
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        if (msg !== "") {
        
            const userDetails = await getUser(userEmail);
            let dateTime = new Date();
            let currentDate = dateTime.toLocaleString('nl-nl', {
                dateStyle: 'medium',
                timeStyle: 'short',
                hour12: false,
              })
            await db.collection('messages').add({
                chatId: getCurrentChatId(),
                text: msg,
                firstName: userDetails.result.firstName,
                lastName: userDetails.result.lastName,
                email: userEmail,
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
                            <input autoComplete="off" className='col-10 form-control searchBar center-block' type="text" name="message" placeholder="Type Bericht..."  value={msg} onChange={e => setMsg(e.target.value)}></input>
                            <button type="submit" className="col-2 btn sendButton">Send</button>

                    </div>


                </div>
            </form>
        </div>




    )
}
export default SendMessage