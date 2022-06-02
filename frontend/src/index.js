import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts"
import TempFirebaseLogin from "./pages/TempFirebaseLogin"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="Contacts" element={<Contacts />} />
    <Route path="TempFirebaseLogin" element={<TempFirebaseLogin />} />
  </Routes>
</BrowserRouter>);
