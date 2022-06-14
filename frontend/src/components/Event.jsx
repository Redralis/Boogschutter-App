import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Event(props) {
  const [enrolled, setEnrolled] = useState(false);

  useEffect(async () => {
    const resp = await axios.post(
      `http://localhost:5000/participate/${event.eventId}`,
      {}
    );
  }, []);

  const event = props.event;
  const dateObject = new Date(event.date);
  const convertedDate = dateObject.toLocaleString("nl-nl", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  });

  const participateEvent = async () => {
    try {
      const email = localStorage.getItem("email");

      const resp = await axios.post(
        `http://localhost:5000/participate/${event.eventId}`,
        {
          email,
        }
      );
    } catch (err) {}
  };

  return (
    <div className="card-body">
      <h3>{event.eventName}</h3>
      <p>{convertedDate}</p>
      <button onClick={participateEvent}>Inschrijven</button>
    </div>
  );
}

export default Event;
