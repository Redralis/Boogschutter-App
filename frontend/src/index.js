import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Contacts from "./pages/Contacts"
import ResetPassword from "./pages/ResetPassword"
import Documents from './pages/Documents';
import ExternalLinks from './pages/ExternalLinks';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="Contacts" element={<Contacts />} />
    <Route path="Contacts/Chat" element={<Chat />} />
    <Route path="links" element={<ExternalLinks />} />
    <Route path="Documents" element={<Documents />} />
    <Route path="ResetPassword" element={<ResetPassword/>} /> 
  </Routes>
</BrowserRouter>);
