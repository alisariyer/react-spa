import React from "react";
import { ref, remove } from "firebase/database";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { GoTrashcan } from "react-icons/go";
import { FaLink } from "react-icons/fa";

export default function MeetingList({ meetings, userId }) {

    const navigate = useNavigate();

    function deleteMeeting(e, meetingId) {
        e.preventDefault();
        remove(ref(db, `users/${userId}/${meetingId}`))
            .then(() => console.log('removed'))
            .catch((e) => console.error(e))
    }

    const myMeetings = meetings.map((meeting, index) => (
        <li className="list-group-item list-group-item-action d-flex align-items-center" key={meeting.meetingId} >
            <div className="btn-group me-2" role="group" aria-label="Meeting options">
                <button 
                    className="btn btn-sm btn-outline-secondary"
                    title="Delete meeting"
                    onClick={e => deleteMeeting(e, meeting.meetingId)}
                >
                    <GoTrashcan />
                </button>
                <button 
                    className="btn btn-sm btn-outline-secondary"
                    title="Check in"
                    onClick={() => navigate(`/checkin/${userId}/${meeting.meetingId}`)}
                >
                    <FaLink />
                </button>
            </div>
            {meeting.meetingName}
        </li>
    ))
    return (
        <div>{myMeetings}</div>
    )
}