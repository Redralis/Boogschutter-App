import logo from "../images/Logo.png";
import "../styles/Login.css";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState(0);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(email, password);
    try {
      const resp = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      setCredentialError(200);
      console.log(resp.data)
    } catch (err) {
      if (err.request.status === 404) {
        setCredentialError(404);
      } else if (err.request.status === 400) {
        setCredentialError(400);
      }
    }
  }

  return (
    <div className="loginScreen">
      <div className="container ">
        <main className="form-signin">
          <form onSubmit={handleSubmit.bind(this)}>
            <img
              className="mb-4"
              src={logo}
              alt=""
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
            <div className="form-floating">
              <label htmlFor="floatingPassword">Wachtwoord</label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Wachtwoord"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="">
              <input
                type="submit"
                value="Log in"
                className="w-100 btn btn-lg loginButton"
              />
            </div>

            <Link to="/ResetPassword">
                <div className="passwordLink">
                  <label>
                    Wachtwoord vergeten?
                  </label>
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
