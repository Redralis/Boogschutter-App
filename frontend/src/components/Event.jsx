import React, { useState } from "react";
import EventPopup from "../components/EventPopup";

function Event(props) {
  const event = props.event;
  const dateObject = new Date(event.datePicker);
  const convertedDate = dateObject.toLocaleString("nl-nl", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  });

  const showPopUpComponent = () => {};

  return (
    <>
      <EventPopup
        id={event.eventId}
        event={event}
        date={convertedDate}
      ></EventPopup>
      <button
        onClick={showPopUpComponent}
        data-toggle="modal"
        data-target={"#" + event.eventId}
      >
        <div className="card-body">
          <h3>{event.eventName}</h3>
          <p>{convertedDate}</p>
          <p>{event._count.eventParticipants + "/" + event.maxParticipants} aanmeldingen</p>
        </div>
      </button>
    </>
  );
}

export default Event;
