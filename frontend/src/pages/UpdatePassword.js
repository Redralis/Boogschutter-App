import React from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/Logo.png'
import '../styles/ResetPassword.css'
import {queryToUpdatePassword, sendEmailToResetPassword} from '../ApiServices/ResetPassword'

export default function ResetPassword() {
    let firstPassword;
    let secondPassword;
    let token;




// onChange Handler function

    const getToken = (event)=>{
        // show the user input value to console
        token = event.target.value;
        console.log(token);
    };

    const getFirstPasswordValue = (event)=>{
        // show the user input value to console
        firstPassword = event.target.value;
        console.log(firstPassword);
    };

    const getSecondPasswordValue = (event)=>{
        // show the user input value to console
        secondPassword = event.target.value;
        console.log(secondPassword);
    };

    //On click
    function updatePassword() {
        // Get the variable
        let email = localStorage['mail'];
        localStorage.removeItem( 'mail' );
        // Clear the localStorage
        console.log(email, 'email second page');

        var data ={
            "token": token,
            "email": email,
            "password": firstPassword
        };
        console.log(data)

        if (email === undefined) {
            alert("Email niet gevonden. Probeer opnieuw een token te krijgen.")
        }

        if (firstPassword === secondPassword) {
            queryToUpdatePassword(data).then(res => {
                console.log(res.data)
            })
        } else {
            alert("Wachtwoorden zijn niet het zelfde.")
        }

        if (token === undefined && email === undefined && firstPassword === undefined && secondPassword === undefined) {
            alert("Niet alle velden zijn ingevuld.")
        }

    }


    return (
        <div>
            <head>
                {/* Start of Bootstrap imports */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous">
                </link>
                {/* End of Bootstrap imports */}
            </head>

            <body className="resetPasswordScreen">
            <div className='container '>
                <main class="form-signin">
                    <form>
                        <img class="mb-4" src={logo} alt="" width="72" height="57"></img>
                        <h1 class="h3 mb-3 fw-normal">Reset je password hier</h1>

                        <div className="form-floating">
                            <label htmlFor="floatingInput">Token:</label>
                            <input type="token" className="form-control" id="passwordInput" placeholder="token van het mailtje"
                                   onChange={getToken}>

                            </input>
                        </div>

                        <div class="form-floating">
                            <label htmlFor="floatingInput">Nieuw wachtwoord</label>
                            <input type="password" class="form-control" id="passwordInput" placeholder="qwerty@123" onChange={getFirstPasswordValue}></input>
                        </div>
                        <div className="form-floating">
                            <label htmlFor="floatingInput">valideer je wachtwoord</label>
                            <input type="password" className="form-control" id="passwordInput"
                                   placeholder="qwerty@123" onChange={getSecondPasswordValue}>
                            </input>
                        </div>
                        <Link to="/Login">
                            <div className="sendEmailButton">
                                <button className="w-100 btn btn-lg " type="submit" onClick={updatePassword}>Update mijn
                                    wachtwoord
                                </button>
                            </div>
                        </Link>
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
    );
}