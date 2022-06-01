import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Login</h1>
      <button>
        <Link to="/contacts">Contacts</Link>
      </button>
    </div>
  );
}

export default App;
