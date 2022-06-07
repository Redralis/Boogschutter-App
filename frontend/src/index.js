import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Register from './pages/Register';
import External_links from "./pages/external_links";
import Documents from './pages/Documents';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="Contacts" element={<Contacts />} />
    <Route path="Register" element={<Register />} />
    <Route path="links" element={<External_links />} />
    <Route path="Documents" element={<Documents />} />
  </Routes>
</BrowserRouter>);
