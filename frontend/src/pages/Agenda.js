import "../styles/Login.css";
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Agenda() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/event")
      .then(function (response) {
        console.log(response);
        setEvents(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AuthChecker></AuthChecker>
      <Navbar />
      <div className="loginScreen">
        <div className="container ">
          <div className="col-xs-4 row justify-content-between">
            <button type="button " className="agenda-buttons float-left">
              Vorige
            </button>
            <h1 className="display-6 float-center">Datum</h1>
            <button type="button " className="agenda-buttons float-right">
              Volgende
            </button>
          </div>

          <h1 className="float-center display-6"> maandag </h1>
          <div className="card">
            <div className="card-body">Masterclass boogschieten</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agenda;
