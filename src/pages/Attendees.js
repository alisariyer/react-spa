import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import { FaUndo, FaRandom } from "react-icons/fa";
import AttendeesList from "../components/AttendeesList";

export default function Attendees({ adminUser }) {

    const { userId, meetingId } = useParams();
    const [displayAttendees, setDisplayAttendees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const attendeesRef = ref(db, `meetings/${userId}/${meetingId}/attendees`) 
        onValue(attendeesRef, (snapshot) => {
            const attendees = snapshot.val();
            const attendeesList = []
            for (let item in attendees) {
                attendeesList.push({
                    attendeeId: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail,
                    star: attendees[item].star
                })
            }
            setDisplayAttendees(attendeesList);
        })
    }, []);

    const dataFilter = item => item.attendeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const filteredAttendees = displayAttendees.filter(dataFilter);
    function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    function resetQuery() {
        setSearchQuery('');
    }

    function chooseRandom() {
        const randomNumber = Math.floor(Math.random() * displayAttendees.length);
        setSearchQuery(displayAttendees[randomNumber].attendeeName)
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="fw-light text-center">
                        Attendees
                    </h1>
                    <div className="card bg-light mb-4">
                        <div className="card-body text-center">
                            <div className="input-group input-group-lg">
                            <input 
                                type="text" 
                                name="search" 
                                value={searchQuery}
                                placeholder="Search Attendees"
                                className="form-control"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-info btn-sm"
                                title="Choose a random attendee"
                                onClick={chooseRandom}
                            ><FaRandom/></button>
                            <button
                                type="button"
                                className="btn btn-outline-info btn-sm"
                                title="Reset search"
                                onClick={resetQuery}
                            ><FaUndo/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AttendeesList
                attendees={filteredAttendees}
                userId={userId}
                adminUser={adminUser}
                meetingId={meetingId}
            />
        </div>
    )
}