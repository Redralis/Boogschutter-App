import TemporaryLoginFirebase from '../components/TemporaryLoginFirebase';
import {auth} from '../firebase/firebase.js'
import {useAuthState} from  'react-firebase-hooks/auth'
import Chats from '../components/Chats';
import Navbar from '../components/Navbar'

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <>
    <Navbar />
    {user ? <Chats/> : <TemporaryLoginFirebase /> }
    </>
  );
  
}
export default App;
