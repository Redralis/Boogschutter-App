import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Login</h1>
      <button>
        <Link to="/chats">Chats</Link>
      </button>
    </div>
  );
}

export default App;
