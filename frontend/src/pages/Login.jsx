import logo from "../images/Logo.png";
import "../styles/Login.css";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { auth } from "../firebase/firebase.js";
import pdf from '../pdf/privacy_statement.pdf'



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState(0);

  async function firebaseSignIn() {

    await auth.signOut();
    auth.signInWithEmailAndPassword(process.env.REACT_APP_FIREBASE_ACCOUNT_EMAIL, process.env.REACT_APP_FIREBASE_ACCOUNT_PASSWORD).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      
    });
  }


  let navigate = useNavigate();


  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      
      setCredentialError(200);
      firebaseSignIn(email, password);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("email", resp.data.email);
      navigate("/announcements", { replace: true });
    } catch (err) {
      if (err.request.status === 404) {
        setCredentialError(404);
      } else if (
        typeof err.response.data.error !== "undefined" &&
        err.response.data.error === 400
      ) {
        setCredentialError(400);
      }
    }
  }

  return (
    <div className="loginScreen">
      <div className="container ">
        <main className="form-signin">
          <form className="boogschutterLogo" onSubmit={handleSubmit.bind(this)}>
            <img
              className="mb-4"
              src={logo}
              alt="Logo boog"
              width="72"
              height="57"
            ></img>
            <h1 className="h3 mb-3 fw-normal">Log in bij uw account</h1>
            <div className="form-floating">
              <label htmlFor="floatingInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="naam@voorbeeld.nl"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="form-floating topMargin">
              <label htmlFor="floatingPassword">Wachtwoord</label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="wachtwoord"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="form-check " style={{ padding: 0 }}>
              <input type="checkbox" required  />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Ik accepteer de <a href={pdf} edownload="HBSV Alliance d'Amitié privacy verklaring">privacyverklaring</a>
              </label>
            </div>
            <div className="">
              <input
                type="submit"
                value="Log in"
                className="w-100 btn btn-lg agenda-buttons"

              />
            </div>

            <Link to="/resetpassword">
              <div className="passwordLink">
                <label>Wachtwoord vergeten?</label>
              </div>
            </Link>

            {credentialError === 404 && (
              <div
                className=" credentialErrorButton alert alert-danger"
                role="alert"
              >
                Email/wachtwoord incorrect.
              </div>
            )}
            {credentialError === 400 && (
              <div
                className=" credentialErrorButton alert alert-danger"
                role="alert"
              >
                Er is iets mis gegaan
              </div>
            )}
            {credentialError === 200 && (
              <div
                className=" credentialErrorButton alert alert-success"
                role="alert"
              >
                Succesvol ingelogd
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
