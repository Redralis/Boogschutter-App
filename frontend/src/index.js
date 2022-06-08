import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import Login from "./pages/Login"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="Contacts" element={<Contacts />} />
    <Route path="ResetPassword" element={<ResetPassword/>} />
    <Route path="UpdatePassword" element={<UpdatePassword/>} />
    <Route path="Login" element={<Login/>}/>
  </Routes>
</BrowserRouter>);
