import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/Logo.png'
import '../styles/ResetPassword.css'
import { queryToUpdatePassword, sendEmailToResetPassword } from '../ApiServices/ResetPassword'
import { getAuth, updatePassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../firebase/firebase.js'
import {getUser} from "../ApiServices/GetUser"


export default function ResetPassword() {
    let oldPassword;
    let firstPassword;
    let secondPassword;
    let token;


    // onChange Handler function
    const getToken = (event) => {
        // show the user input value to console
        token = event.target.value;
    };

    const getFirstPasswordValue = (event) => {
        // show the user input value to console
        firstPassword = event.target.value;
    };

    const getSecondPasswordValue = (event) => {
        // show the user input value to console
        secondPassword = event.target.value;
    };

    //On click
    async function updatePasswordOnClick() {
        // Get the variable
        let email = localStorage['mail'];
        localStorage.removeItem('mail');
        // Clear the localStorage

        let data = {
            "token": token,
            "email": email,
            "password": firstPassword
        };

        if (email === undefined) {
            alert("Email niet gevonden. Probeer opnieuw een token te krijgen.")
        }

        if (firstPassword === secondPassword) {
            let passwordFromApi;
            await getUser(email).then(async res => {
                passwordFromApi = res.result.password
            })

            queryToUpdatePassword(data).then(async res => {
                if (res.status === 200) {
                    const user = auth.currentUser;
                    const newPassword = firstPassword;

                    console.log(email)
                    console.log(passwordFromApi)
                    await auth.signInWithEmailAndPassword(email, passwordFromApi)
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.log(errorCode, errorMessage)
                        });


                    let newPass;
                    await getUser(email).then(async res => {
                        newPass = res.result.password
                    })
                    updatePassword(user, newPass).then(() => {
                        alert(" Wachtwoord wijzigen gelukt!.")
                        auth.signOut()
                    }).catch((error) => {
                        alert(error)
                    });
                } else {
                    alert("Token of het wachtwoord is iets niet goed gegaan. Probeer het opnieuw door terug naar het inlogpagina te gaan, en opnieuw op wachtwoord vergeten te drukken. .")
                }
            })
        } else {
            alert("Wachtwoorden zijn niet het zelfde.")
        }

        if (token === undefined && email === undefined && firstPassword === undefined && secondPassword === undefined) {
            alert("Niet alle velden zijn ingevuld.")
        }

    }


    return (
        <>
            <body className="resetPasswordScreen">
                <div className='container '>
                    <main class="form-signin">
                        <form>
                            <img class="mb-4" src={logo} alt="" width="72" height="57"></img>
                            <h1 class="h3 mb-3 fw-normal">Reset wachtwoord</h1>
                            <div className="form-floating">
                                <label htmlFor="floatingInput">Code:</label>
                                <input 
                                type="token" 
                                className="form-control" 
                                id="passwordInput" 
                                placeholder="code"
                                onChange={getToken}>
                                </input>
                            </div>
                            <div className="form-floating topMargin">
                                <label htmlFor="floatingInput">Nieuw wachtwoord</label>
                                <input 
                                type="password" 
                                className="form-control" 
                                id="passwordInput" 
                                placeholder="wachtwoord" 
                                onChange={getFirstPasswordValue}></input>
                            </div>
                            <div className="form-floating">
                                <label htmlFor="floatingInput">Valideer je wachtwoord</label>
                                <input 
                                type="password" 
                                className="form-control" 
                                id="passwordInput"
                                placeholder="wachtwoord" 
                                onChange={getSecondPasswordValue}>
                                </input>
                            </div>
                            <Link to="/Login">
                                <div className="sendEmailButton">
                                    <button className="w-100 btn btn-lg " type="submit" onClick={updatePasswordOnClick}>Update mijn
                                        wachtwoord
                                    </button>
                                </div>
                            </Link>
                        </form>
                    </main>
                </div>
            </body>
        </>
    );
}