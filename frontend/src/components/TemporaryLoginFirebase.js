import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../firebase/firebase.js'
import React, { useState } from "react";
//import { setSelectedChat } from './Chat.js';

function SignIn() {
  function registerEandP() {
    auth.createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setemailError(errorCode);
        console.log(errorCode, errorMessage)
        console.log(email, password)
      });
  }
  
  function signInEandP() {
//    setSelectedChat("")
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        console.log(email, password)
      });
  }

  const loginSubmit = (e) => {
    e.preventDefault();
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");

  return (
    
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={signInEandP}>
                Submit
              </button>
              <button type="submit" className="btn btn-primary" onClick={registerEandP}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn