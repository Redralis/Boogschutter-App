import React from 'react';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import logo from '../Images/Logo.png'
import '../styles/ResetPassword.css'
import {queryToUpdatePassword, sendEmailToResetPassword} from '../ApiServices/ResetPassword'
=======
import logo from '../images/Logo.png'
import '../styles/ResetPassword.css'
import { queryToUpdatePassword, sendEmailToResetPassword } from '../ApiServices/ResetPassword'
>>>>>>> fb9e5569e58f5526d820c79b429be4cf4b6c40e7

export default function ResetPassword() {
    let userValue;

<<<<<<< HEAD
// onChange Handler function
    const getInputValue = (event)=>{
=======
    // onChange Handler function
    const getInputValue = (event) => {
>>>>>>> fb9e5569e58f5526d820c79b429be4cf4b6c40e7
        // show the user input value to console
        userValue = event.target.value;
        console.log(userValue);
    };

    //On click
    function sendValueToAPI() {
        console.log('test')
        sendEmailToResetPassword(userValue).then(res => {
<<<<<<< HEAD
            console.log(res.data)
=======
            localStorage.setItem('mail', userValue)
            console.log(userValue, 'email first page');
>>>>>>> fb9e5569e58f5526d820c79b429be4cf4b6c40e7
        })
    }

    return (
<<<<<<< HEAD
        <div>
            <head>
                {/* Start of Bootstrap imports */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
                </link>
                {/* End of Bootstrap imports */}
            </head>

            <body className="resetPasswordScreen">
            <div className='container '>
                <main class="form-signin">
                    <form>
                        <img class="mb-4" src={logo} alt="" width="72" height="57"></img>
                        <h1 class="h3 mb-3 fw-normal">Reset je password hier</h1>

                        <div class="form-floating">
                            <label for="floatingInput">Email address</label>
                            <input type="email" class="form-control" id="floatingInput" placeholder="naam@voorbeeld.nl" onChange={getInputValue}></input>

                        </div>
                            <div className="sendEmailButton">
                                <button class="w-100 btn btn-lg " type="submit" onClick={sendValueToAPI}>Verstuur me een mail</button>
                            </div>
                    </form>
                </main>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                    crossorigin="anonymous"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
                    integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
                    crossorigin="anonymous"></script>

            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
                    integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
                    crossorigin="anonymous"></script>
            </body>
        </div>
=======
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
>>>>>>> fb9e5569e58f5526d820c79b429be4cf4b6c40e7
    );
}