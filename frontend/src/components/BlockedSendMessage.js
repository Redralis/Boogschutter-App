
import React from 'react'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase/firebase.js'
function SendMessage() {
    
    const [user] = useAuthState(auth);
    return (

        <div>

            <form >

                <div key="sendBar"className="container sendMessageContainer fixed-bottom">
                    <div className='row'>

                    </div>
                    <div className='row'>
                            {/* <input className='searchBar col-10' placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} /> */}
                            <input className='col-10 form-control blockedSearchBar center-block' type="text" name="message" placeholder="Geblokkeerd door beheerder."  ></input>
                            <button type="button" className="col-2 btn sendButton">Send</button>

                    </div>


                </div>
            </form>
        </div>




    )
}
export default SendMessage