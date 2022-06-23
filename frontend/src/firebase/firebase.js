import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCb6gXjXDRIAxJAQglB5zTH5Kz5pTeT3HQ",
  authDomain: "alliancedamitie-app.firebaseapp.com",
  projectId: "alliancedamitie-app",
  storageBucket: "alliancedamitie-app.appspot.com",
  messagingSenderId: "206569007946",
  appId: "1:206569007946:web:b87698c008e175b4796fb3",
  measurementId: "G-MZ3H2X817H"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export {db, auth}