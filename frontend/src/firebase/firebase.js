import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBbUmk_hA9Wa3OlzmOq5wxlL9_F5CU24FU",
  authDomain: "firechat-5a319.firebaseapp.com",
  projectId: "firechat-5a319",
  storageBucket: "firechat-5a319.appspot.com",
  messagingSenderId: "792945212585",
  appId: "1:792945212585:web:1b0fd8d5f0dbd54d527db8"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export {db, auth}