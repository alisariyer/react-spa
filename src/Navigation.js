import React from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

export default function Navigation({ user }) {
    return (
        <nav className="navbar navbar-expand bg-primary navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <FaUsers className="fs-2 me-2 pb-1"/>Meeting Log
                </Link>
                <ul className="navbar-nav ms-auto">
                    {user && <Link className="nav-item nav-link" to="/meetings">
                        meetings
                    </Link>}
                    {!user && <Link className="nav-item nav-link" to="/register">
                        register
                    </Link>}
                    {!user && <Link className="nav-item nav-link" to="/login">
                        log in
                    </Link>}
                    {user && <Link className="nav-item nav-link" to="/logout">
                        log out
                    </Link>}
                </ul>
            </div>
        </nav>
    )
}