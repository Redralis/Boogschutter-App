import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/Logo.png'
import '../styles/ResetPassword.css'
import { queryToUpdatePassword, sendEmailToResetPassword } from '../ApiServices/ResetPassword'

export default function ResetPassword() {
    let userValue;

    // onChange Handler function
    const getInputValue = (event) => {
        // show the user input value to console
        userValue = event.target.value;
        console.log(userValue);
    };

    //On click
    function sendValueToAPI() {
        console.log('test')
        sendEmailToResetPassword(userValue).then(res => {
            localStorage.setItem('mail', userValue)
            console.log(userValue, 'email first page');
        })
    }

    return (
        <>
            <div className='resetPasswordScreen'>
                <div className='container '>
                    <main class="form-signin">
                        <form>
                            <img class="mb-4" src={logo} alt="" width="72" height="57"></img>
                            <h1 class="h3 mb-3 fw-normal">Vraag resetcode aan</h1>
                            <div class="form-floating">
                                <label for="floatingInput">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="naam@voorbeeld.nl"
                                    onChange={getInputValue}>
                                </input>
                            </div> 
                            <Link to="/updatepassword">
                                <button className="w-100 btn btn-lg agenda-buttons topMargin" type="submit" onClick={sendValueToAPI}>Verstuur me een
                                    mail
                                </button>
                            </Link>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}