import logo from "../images/Logo.png";
import "../styles/Login.css";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Agenda() {

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

    
    try {
      const resp = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      setCredentialError(200);
      
    } catch (err) {
      if (err.request.status === 404) {
        setCredentialError(404);
      } else if (err.request.status === 400) {
        setCredentialError(400);
      }
    }
  }
    return (
        <>
            <div className="loginScreen">
                <div className="container ">
                    <main className="form-signin">
                        <form onSubmit={handleSubmit.bind(this)}>
                            <img
                                className="mb-4"
                                src={logo}
                                alt="Logo boog"
                                width="72"
                                height="57"
                            ></img>
                            <h1 className="h3 mb-3 fw-normal">Registreer bij uw account</h1>
                            <div className="form-floating">
                                <label htmlFor="floatingInput">Geef uw email adress</label>
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
                                <label htmlFor="floatingPassword">Kies een wachtwoord</label>
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
                                <Link to="/contacts">
                                    <input
                                        type="submit"
                                        value="Registreer"
                                        className="w-100 btn btn-lg agenda-buttons"
                                    />
                                </Link>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Agenda;