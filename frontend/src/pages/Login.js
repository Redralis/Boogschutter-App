import { Link } from "react-router-dom";
import logo from "../Images/Logo.png";
import "../styles/Login.css";

export function Login() {
  return (
    <>
      <div className="container ">
        <main className="form-signin">
          <form>
            <img className="mb-4" src={logo} alt="" width="72" height="57"></img>
            <h1 className="h3 mb-3 fw-normal">Log in bij uw account</h1>

            <div className="form-floating">
              <label for="floatingInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="naam@voorbeeld.nl"
              ></input>
            </div>
            <div className="form-floating">
              <label for="floatingPassword">Wachtwoord</label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Wachtwoord"
              ></input>
            </div>

            <Link to="/contacts">
              <div className="loginButton">
                <button className="w-100 btn btn-lg " type="submit">
                  Log in
                </button>
              </div>
            </Link>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
