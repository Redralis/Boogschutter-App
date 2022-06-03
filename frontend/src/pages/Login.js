import logo from "../Images/Logo.png";
import "../styles/Login.css";
import axios from "axios";
import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", credentialError: 0 };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const resp = await axios.post("http://localhost:3000/login", {
        email: this.state.email,
        password: this.state.password,
      });
      this.setState({ credentialError: 200 });
    } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); // ***
      console.error(err.response.status); // ***
      console.error(err.response.headers);

      if (err.request.status === 404) {
        this.setState({ credentialError: 404 });
      } else if (err.request.status === 400) {
        this.setState({ credentialError: 400 });
      }
    }
  }

  render() {
    return (
      <div className="loginScreen">
        <div className="container ">
          <main className="form-signin">
            <form onSubmit={this.handleSubmit.bind(this)}>
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
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                ></input>
              </div>
              <div className="form-floating">
                <label htmlFor="floatingPassword">Wachtwoord</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Wachtwoord"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                ></input>
              </div>
              <div className="">
                <input
                  type="submit"
                  value="Log in"
                  className="w-100 btn btn-lg loginButton"
                />
              </div>
              {this.state.credentialError === 404 && (
                <div
                  className=" credentialErrorButton alert alert-danger"
                  role="alert"
                >
                  Email/wachtwoord incorrect.
                </div>
              )}
              {this.state.credentialError === 400 && (
                <div
                  className=" credentialErrorButton alert alert-danger"
                  role="alert"
                >
                  Er is iets mis gegaan
                </div>
              )}
              {this.state.credentialError === 200 && (
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
}

export default Login;
