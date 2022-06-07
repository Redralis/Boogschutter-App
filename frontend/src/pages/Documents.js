import React from "react";
import pdf from '../pdf/boogschutter.pdf'
import '../styles/Documents.css'
import Navbar from "../components/Navbar";


export function Documents() {
  return (
    <>
      <Navbar />
      <div className="loginScreen">
        <div className="container ">
          <h1 className="h3 mb-3 fw-normal">Documenten </h1>
          <iframe src={pdf} title="Regels boogschuttersbond."width="100%" height="980vh">Your browser does not support embedded frames (iframes)</iframe>
        </div>
      </div>
    </>
  );
}

export default Documents;