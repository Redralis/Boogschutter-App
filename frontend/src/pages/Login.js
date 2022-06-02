import { Link } from "react-router-dom";
import logo from "../Images/Logo.png";
import "../styles/Login.css";
import resetPassword from "./ResetPassword";

export function Login() {
  return (
    <>
      <div className="container ">
        <main className="form-signin">
          <form>
            <img
              className="mb-4"
              src={logo}
              alt=""
              width="72"
              height="57"
            ></img>
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

            <div class="form-floating">
              <label for="floatingPassword">Wachtwoord</label>
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              ></input>
            </div>

            <Link to="/contacts">
              <div className="loginButton">
                <button class="w-100 btn btn-lg " type="submit">
                  Log in
                </button>
              </div>
            </Link>

            <Link to="/ResetPassword">
              <div className="passwordLink">
                <label>Wachtwoord vergeten?</label>
              </div>
            </Link>
          </form>
        </main>
      </div>
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"
      ></script>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
        integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
        crossorigin="anonymous"
      ></script>

      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
        integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"
      ></script>
    </>
  );
}

export default Login;
