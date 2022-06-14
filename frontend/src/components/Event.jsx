import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Event(props) {

  let navigate = useNavigate();

  const participateEvent = () => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/", { replace: true });
      }
      
    } catch (err) {}
  };

  const event = props.event;
  const dateObject = new Date(event.date);
  const convertedDate = dateObject.toLocaleString("nl-nl", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  });

  return (
    <div className="card-body">
      <h3>{event.eventName}</h3>
      <p>{convertedDate}</p>
      <button>Inschrijven</button>
    </div>
  );

}

export default Event;
