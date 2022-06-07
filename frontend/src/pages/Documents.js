import { Link } from "react-router-dom";
import React from "react";
import logo from '../Images/Logo.png'
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
          <iframe src="https://www.orimi.com/pdf-test.pdf" width="100%" height="100%"></iframe>
        </div>
      </div>
    </>
  );
}

export default Documents;