import TemporaryLoginFirebase from "../components/TemporaryLoginFirebase";
import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Chats from "../components/Chats";
import Navbar from "../components/Navbar";
import "../styles/Contacts.css";
import { jwtContext } from "react";
import AuthChecker from "../components/AuthChecker.jsx";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <AuthChecker></AuthChecker>
      <Navbar />
      {user ? <Chats /> : <TemporaryLoginFirebase />}
    </>
  );
}
export default App;
