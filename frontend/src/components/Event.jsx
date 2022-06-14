import React, { useEffect, useState } from "react";
import axios from "axios";

function Event(props) {
  const [enrolled, setEnrolled] = useState(false);
  const email = localStorage.getItem("email");

  const event = props.event;
  const dateObject = new Date(event.date);
  const convertedDate = dateObject.toLocaleString("nl-nl", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  });

  const isEnrolledFunc = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/participate/isenrolled/",
        { eventid: parseInt(event.eventId), email }
      );
      setEnrolled(resp.data.isEnrolled);
    } catch (err) {
      console.log("Requests went wrong");
    }
  };

  useEffect(() => {
    isEnrolledFunc();
  }, [isEnrolledFunc()]);

  const participateEvent = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:5000/participate/event/${event.eventId}`,
        {
          email,
        }
      );
      isEnrolledFunc()
    } catch (err) {}
  };

  return (
    <div className="card-body">
      <h3>{event.eventName}</h3>
      <p>{convertedDate}</p>
      {enrolled ? (
        <button disabled>Ingeschreven</button>
      ) : (
        <button onClick={participateEvent}>Inschrijven</button>
      )}
    </div>
  );
}

export default Event;
