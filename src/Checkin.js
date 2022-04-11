import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormError from "./FormError";
import { push, ref } from "firebase/database";

function Checkin() {
  const { userId, meetingId } = useParams();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    displayName: "",
    email: "",
  });

  function handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    setCredentials((prevState) => ({ ...prevState, [itemName]: itemValue }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    push(ref(db, `meetings/${userId}/${meetingId}/attendees`), {
      attendeeName: credentials.displayName,
      attendeeEmail: credentials.email
    }).then(() => navigate(`/attendees/${userId}/${meetingId}`))
    .catch((e) => console.log(e))
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="fw-light mb-3">Check In</h3>
                <div className="mb-3">
                  <label className="form-label visually-hidden" htmlFor="displayName">Name</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={credentials.displayName}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label visually-hidden" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-0 text-right">
                  <button className="btn btn-primary" type="submit">Check in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Checkin;
