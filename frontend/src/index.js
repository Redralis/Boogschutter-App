import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Contacts from "./pages/Contacts"
import ResetPassword from "./pages/ResetPassword"
=======
import Chat from "./pages/Chat";
import Contacts from "./pages/Contacts"
import ResetPassword from "./pages/ResetPassword"
import Documents from './pages/Documents';
import Agenda from './pages/Agenda';
import Register from './pages/Register';
import UpdatePassword from "./pages/UpdatePassword"
import Login from "./pages/Login"

>>>>>>> fb9e5569e58f5526d820c79b429be4cf4b6c40e7

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
<<<<<<< HEAD
    <Route path="Contacts" element={<Contacts />} />
    <Route path="ResetPassword" element={<ResetPassword/>} />
=======
    <Route path="Contacten" element={<Contacts />} />
    <Route path="Contacten/Chat" element={<Chat />} />
    <Route path="Documents" element={<Documents />} />
    <Route path="ResetPassword" element={<ResetPassword/>} /> 
    <Route path="Agenda" element={<Agenda/>} />
    <Route path="Register" element={<Register/>} />
    <Route path="UpdatePassword" element={<UpdatePassword/>} />
    <Route path="Login" element={<Login/>}/>
>>>>>>> fb9e5569e58f5526d820c79b429be4cf4b6c40e7
  </Routes>
</BrowserRouter>);
