import Login from './pages/Login'
import {auth} from './firebase/firebase'
import {useAuthState} from  'react-firebase-hooks/auth'
import Chats from './components/Chats';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
    {user ? <Chats/> : <Login /> }
      
    </>
  );
}

export default App;