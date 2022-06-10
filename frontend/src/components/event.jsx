import React from "react";

function Event(props) {
  const event = props.event;
  return (
    <div className="card-body">
     {event.eventName}
    </div>
  );
}

export default Event;
