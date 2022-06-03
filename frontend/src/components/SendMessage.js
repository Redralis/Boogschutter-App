
import { db, auth } from '../firebase/firebase'
import React, { useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getCurrentChatId } from './Chats';
import "bootstrap/dist/css/bootstrap.min.css";

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { email, photoURL } = auth.currentUser

        await db.collection('messages').add({
            chatId: getCurrentChatId(),
            text: msg,
            photoURL,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log("nice thing")
        setMsg('');
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input className='form-control' style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' }} type="submit">Send</button>
                </div>
            </form>
        </div>
        // <Form onSubmit={sendMessage}>
        //     <Form.Group>
        //         <Form.Control className='w-100' placeholder="Message..." value={msg} onChange={(e) => setMsg(e.target.value)}  />
        //     </Form.Group>
        //     <Button type="submit" variant="primary" >Send</Button>{' '}
        // </Form>




    )
}

export default SendMessage