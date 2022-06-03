import TemporaryLoginFirebase from '../components/TemporaryLoginFirebase';
import {auth} from '../firebase/firebase.js'
import {useAuthState} from  'react-firebase-hooks/auth'
import Navbar from '../components/Navbar'
import ChatRoom from '../components/ChatRoom';

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <>
    <Navbar />
    <ChatRoom/>
    </>
  );
  
}
export default App;
