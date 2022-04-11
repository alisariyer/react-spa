import React, { useState } from "react";
import MeetingList from "./MeetingList";

function Meetings({ addMeeting, meetings, userId }) {

  const [meetingName, setMeetingName] = useState("");

  function handleChange(e) {
    const itemValue = e.target.value;
    setMeetingName(itemValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addMeeting(meetingName);
    setMeetingName("");
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="fw-light">Add a meeting</h1>
          <div className="card bg-light mt-4">
            <div className="card-body text-center">
              <form onSubmit={handleSubmit}>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    name="meetingName"
                    value={meetingName}
                    onChange={handleChange}
                    placeholder="Meeting name"
                    aria-describedby="buttonAdd"
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-info"
                    id="buttonId"
                  >
                    +
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-11 col-md-6 text-center">
          <div className="card border-top-0 rounded-0">
            {meetings && meetings.numberOfMeetings > 0 && (
              <>
                <div className="card-body py-2">
                  <h4 className="card-title fw-light m-0">Your Meetings</h4>
                </div>
                <ul className="list-group list-group-flush">
                  <MeetingList meetings={meetings.meetingList} userId={userId}/>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetings;
