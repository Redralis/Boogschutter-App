
import Chats from "../components/Chats";
import Navbar from "../components/Navbar";
import "../styles/Contacts.css";
import AuthChecker from "../components/AuthChecker.jsx";

function App() {

  return (
    <>
      <AuthChecker></AuthChecker>
      <Navbar />
      <Chats />
    </>
  );
}
export default App;
