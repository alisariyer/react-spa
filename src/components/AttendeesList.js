import React from "react";
import { GoTrashcan } from "react-icons/go";
import { ref, remove } from "firebase/database";
import { db } from "../Firebase";

export default function AttendeesList({
  attendees,
  userId,
  adminUser,
  meetingId
}) {
  const isAdmin = adminUser === userId;

  function deleteAttendee(e, whichMeeting , whichAttendee) {
    e.preventDefault();
    remove(ref(db, `meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`))
  }

  const myAttendees = attendees.map((attendee) => (
    <div
      key={attendee.attendeeId}
      className="col-8 col-sm-6 col-md-4 mb-3 p-0 px-1"
    >
      <div className="card">
        <div
          className={`card-body px-3 py-2 d-flex align-items ${
            !isAdmin && "justify-content-center"
          }`}
        >
          {isAdmin && (
            <div className="btn-group pe-2">
              <button 
                className="btn btn-sm btn-outline-secondary" 
                title="Delete Attendee"
                onClick={e => deleteAttendee(e, meetingId, attendee.attendeeId)}
              >
                <GoTrashcan />
              </button>
              </div>
          )}
          <div>{attendee.attendeeName}</div>
        </div>
      </div>
    </div>
  ));

  return <div className="row justify-content-center">{myAttendees}</div>;
}
