import "../styles/Login.css";
import Navbar from "../components/Navbar";
import { getUser } from "../ApiServices/GetUser";
import AuthChecker from "../components/AuthChecker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Event from "../components/Event";
import LoadingSpinner from "../components/LoadingSpinner";
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export function Agenda() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(0);
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isMatchLeader, setIsMatchLeader] = useState(false);

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState("");
  const [type, setType] = useState("");

  function onEventNameChange(e) {
    setEventName(e.target.value);
  }

  function onDateChange(e) {
    setDate(e.target.value);
  }

  function onTimeChange(e) {
    setTime(e.target.value);
  }

  function onDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function onMaxParticipantChange(e) {
    setParticipants(e.target.value);
  }

  function onEventTypeChange(e) {
    setType(e.target.value);
  }

  useEffect(() => {
    axios
      .get("https://alliance-damitie-backend.herokuapp.com/event/week")
      .then(function (response) {
        setEvents(response.data.result);
        setTimestamp(response.data.timestamp);
        setLoading(false);
      })
      .catch(function (error) {
        
      });
    getPriveleges();
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
      .get(`https://alliance-damitie-backend.herokuapp.com/event/week?date=${date}`)
      .then(function (response) {
        setEvents(response.data.result);
        setLoading(false);
        setTimestamp(date);
        // setDatePickerValue();
      })
      .catch(function (error) {
        
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
      .get(`https://alliance-damitie-backend.herokuapp.com/event/week?date=${date}`)
      .then(function (response) {
        setEvents(response.data.result);
        setLoading(false);
        setTimestamp(date);
      })
      .catch(function (error) {
        
      });
  };

  const datePickerCall = (e) => {
    
    setDatePickerValue(new Date(e.target.value));
    datePickerValue.setTime(0, 0, 0, 0);
    setTimestamp(datePickerValue.getTime());
    
    setLoading(true);
    axios
      .get(`https://alliance-damitie-backend.herokuapp.com/event/week?date=${datePickerValue.getTime()}`)
      .then(function (response) {
        
        setEvents(response.data.result);
        setLoading(false);
        // setTimestamp(response.data.timestamp);
      })
      .catch(function (error) {
        
      });
  };

  function getPriveleges() {
    getUser(localStorage.getItem("email")).then((res) => {
      setIsAdmin(res.result.isAdmin);
      setIsTrainer(res.result.isTrainer);
      setIsMatchLeader(res.result.isMatchLeader);
    });
  }

  const submitEvent = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://alliance-damitie-backend.herokuapp.com/event/", {
        eventName,
        date,
        time,
        tijd: time,
        description,
        maxParticipants: participants,
        type,
        config,
      })
      .then(function (response) {
        setLoading(false);
        window.location.reload(false);
      })
      .catch(function (error) {
        
      });
  };

  return (
    <>
      <AuthChecker></AuthChecker>
      <Navbar />
      <div className="loginScreen">
        <div className="container ">
          {isAdmin || isTrainer || isMatchLeader ? (
            <div className="row  mb-3">
              <button
                type="button"
                className="agenda-buttons"
                data-toggle="modal"
                data-target="#addEventModal"
              >
                Evenement toevoegen
              </button>
            </div>
          ) : (
            <></>
          )}

          <div
            className="modal fade"
            id="addEventModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Voeg een evenement toe
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="eventName">Naam evenement</label>
                      <input
                        onChange={onEventNameChange}
                        type="text"
                        className="form-control"
                        name="eventName"
                        id=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Datum</label>
                      <input
                        onChange={onDateChange}
                        type="date"
                        className="form-control"
                        name="date"
                        id=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="time">Tijd</label>
                      <input
                        onChange={onTimeChange}
                        type="time"
                        className="form-control"
                        name="time"
                        id=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Omschrijving</label>
                      <textarea
                        onChange={onDescriptionChange}
                        className="form-control"
                        name="description"
                        id=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="participants">Aantal participanten</label>
                      <input
                        onChange={onMaxParticipantChange}
                        type="number"
                        className="form-control"
                        name="participants"
                        id=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="type">Type evenement</label>
                      <input
                        onChange={onEventTypeChange}
                        type="text"
                        className="form-control"
                        name="type"
                        id=""
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Sluiten
                    </button>
                    <button
                      type="button"
                      onClick={submitEvent}
                      className="btn btn-primary"
                    >
                      Opslaan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

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
