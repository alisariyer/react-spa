import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import AttendeesList from "../components/AttendeesList";

export default function Attendees({ adminUser }) {

    const { userId, meetingId } = useParams();
    const [displayAttendees, setDisplayAttendees] = useState([]);

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

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="fw-light text-center">
                        Attendees
                    </h1>
                </div>
            </div>
            <AttendeesList
                attendees={displayAttendees}
                userId={userId}
                adminUser={adminUser}
                meetingId={meetingId}
            />
        </div>
    )
}