import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";

export default function Attendees() {

    const { userId, meetingId } = useParams();
    console.log(userId, meetingId);
    const [displayAttendees, setDisplayAttendees] = useState([]);

    useEffect(() => {
        const attendeesRef = ref(db, `meetings/${userId}/${meetingId}/attendees`) 
        const attendeesList = []
        onValue(attendeesRef, (snapshot) => {
            const attendees = snapshot.val();
            for (let item in attendees) {
                attendeesList.push({
                    atteendeeId: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail
                })
            }
        })
        setDisplayAttendees(attendeesList);
        console.log(attendeesList)
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
            List goes here
        </div>
    )
}