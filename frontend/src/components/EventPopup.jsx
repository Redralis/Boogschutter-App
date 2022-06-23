import React, { useState, useEffect } from "react";
import axios from "axios";

function EventPopup(props) {
  const id = props.id;
  const event = props.event;
  const date = props.date;
  const email = localStorage.getItem("email");

  const [enrolled, setEnrolled] = useState();

  const isEnrolledFunc = async (event) => {
    try {
      const resp = await axios.post(
        "https://boogschutter-api.herokuapp.com/participate/isenrolled/",
        { eventid: parseInt(id), email }
      );
      setEnrolled(resp.data.isEnrolled);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isEnrolledFunc();
  }, []);

  const participateEvent = async () => {
    try {
      const resp = await axios.post(
        `https://boogschutter-api.herokuapp.com/participate/event/${event.eventId}`,
        {
          email,
        }
      );
      isEnrolledFunc();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal fade" aria-hidden="true" id={id}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {event.eventName}
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
          <div className="modal-body">
            <p>
              <strong>Omschrijving</strong>
            </p>
            <p>{event.description}</p>
            <p>
              <strong>Tijd en datum: </strong> {date}
            </p>
            <p>
              <strong>Type evenement:</strong> {event.type}
            </p>
            <p>
              <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#aanmeldingenDIv"
                aria-expanded="false"
                aria-controls="aanmeldingenDIv"
              >
                Aanmeldingen
              </button>
            </p>

            <div id="aanmeldingenDIv" className="collapse">
              <ul>
                {event.eventParticipants.map((participant) => (
                  <li key={participant.user.firstName}>
                    {participant.user.firstName +
                      " " +
                      participant.user.lastName}
                  </li>
                ))}
              </ul>
            </div>

            {enrolled ? (
              <>
                {" "}
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  disabled
                >
                  Al ingeschreven
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Uitschrijven
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={participateEvent}
              >
                Inschrijven
              </button>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPopup;
