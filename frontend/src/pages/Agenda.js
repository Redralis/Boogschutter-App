import "../styles/Login.css";
import Navbar from "../components/Navbar";

import AuthChecker from "../components/AuthChecker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Event from "../components/Event";
import LoadingSpinner from "../components/LoadingSpinner";

export function Agenda() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(0);
  const [datePickerValue, setDatePickerValue] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:5000/event/week")
      .then(function (response) {
        setEvents(response.data.result);
        setTimestamp(response.data.timestamp);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getPreviousWeek = () => {
    const currentDate = new Date(timestamp);
    setLoading(true);
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );

    date.setHours(0, 0, 0, 0);
    date = date.getTime();

    axios
      .get(`http://localhost:5000/event/week?date=${date}`)
      .then(function (response) {
        setEvents(response.data.result);
        setLoading(false);
        setTimestamp(date);
        setDatePickerValue();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNextWeek = () => {
    const currentDate = new Date(timestamp);
    setLoading(true);
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7
    );

    date.setHours(0, 0, 0, 0);
    date = date.getTime();

    axios
      .get(`http://localhost:5000/event/week?date=${date}`)
      .then(function (response) {
        setEvents(response.data.result);
        setLoading(false);
        setTimestamp(date);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const datePickerCall = (e) => {
    console.log(e.target.value);
    setDatePickerValue(new Date(e.target.value));
    setLoading(true);
    axios
      .get(`http://localhost:5000/event/week?date=${datePickerValue.getTime()}`)
      .then(function (response) {
        setEvents(response.data.result);
        setLoading(false);
        setTimestamp(datePickerValue.getTime());
        // setDatePickerValue(datePickerValue.toISOString().split("T", 1)[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <AuthChecker></AuthChecker>
      <Navbar />
      <div className="loginScreen">
        <div className="container ">
          <div className="col-xs-4 row justify-content-between">
            <button
              type="button"
              onClick={getPreviousWeek}
              className="agenda-buttons float-left"
            >
              Vorige
            </button>

            <input
              type="date"
              name=""
              onChange={datePickerCall}
              defaultValue={datePickerValue.toISOString().split("T", 1)[0]}
              id=""
            />
            <button
              type="button "
              onClick={getNextWeek}
              className="agenda-buttons float-right"
            >
              Volgende
            </button>
          </div>

          {/* <h1 className="float-center display-6"> maandag </h1> */}
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div className="card">
              {events.map((event) => (
                <Event key={event.eventId} event={event}></Event>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Agenda;
