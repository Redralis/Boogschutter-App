import React, { useState, useEffect, useRef } from 'react'
import { auth, db } from '../firebase/firebase'
import '../styles/Chat.css'
import { getCurrentChatId } from './Chats'
import SendMessage from './SendMessage'
import SignOut from './SignOut'
function ChatRoom() {
    const scroll = useRef()
    function loadMessages() {
        db.collection('messages').where("chatId", "==", getCurrentChatId()).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            // snapshot.docs.forEach(doc => {
            //   console.log(doc.id, doc.data())
            // })
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
        //    <Col xs={6}>{messages.map(({ id, text, photoURL, email }) => (
        //     <div key={id}>
        //       <img scr={photoURL} alt="" />
        //       <Card >
        //         <ListGroup variant="flush">
        //           <ListGroup.Item >
        //             <Container >
        //               <Row>
        //                 <Col sm={9}>
        //                 <Container>
        //               <Row><h8>{email}</h8></Row>
        //               <Row><h8>{text}</h8></Row>
        //               </Container>


        //                 </Col>
        //                 <Col sm={3} classname="align-me">{deleteButton(email, user.email, id)}</Col>
        //               </Row>
        //             </Container>
        //           </ListGroup.Item>

        //         </ListGroup>
        //       </Card>
        //     </div>
        //   ))}
        //   <SendMessage/>
    )
}

export default ChatRoom