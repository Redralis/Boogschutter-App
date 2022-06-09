import { Link } from "react-router-dom";
import logo from '../Images/Logo.png'
import '../styles/Login.css'

export function Register() {
  return (
    <div>
      <head>
        {/* Start of Bootstrap imports */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
        </link>
        {/* End of Bootstrap imports */}
      </head>

      <body className="loginScreen">
        <div className='container '>
          <main class="form-signin">
            <form>
              <img class="mb-4" src={logo} alt="" width="72" height="57"></img>
              <h1 class="h3 mb-3 fw-normal">Registreer een nieuw account</h1>

              <div class="form-floating">
                <label for="floatingInput">Voor uw email address in</label>
                <input type="email" class="form-control" id="floatingInput" placeholder="naam@voorbeeld.nl"></input>

              </div>
              <div class="form-floating">
                <label for="floatingPassword">Maak een nieuw wachtwoord aan</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Wachtwoord"></input>
              </div>
              
              <Link to="/contacts">
                <div className="loginButton">
                  <button class="w-100 btn btn-lg " type="submit">Maak account aan</button>
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

export default Register;