import React from "react";
import { Link } from "react-router-dom";

function Welcome({ user }) {
  return (
    <div className="text-center fw-bold mt-3">
      <span className="text-secondary ps-1">Welcome {user}</span>, 
      <Link to="/" className="text-primary ps-1">
        log out
      </Link>
    </div>
  );
}

export default Welcome;
