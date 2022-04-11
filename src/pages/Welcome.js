import React from "react";
import { Link } from "react-router-dom";

function Welcome({ userName, logOutUser }) {
  return (
    <div className="text-center fw-bold mt-3">
      <span className="text-secondary ps-1">Welcome {userName}</span>, 
      <Link to="/" className="text-primary ps-1" onClick={e => logOutUser(e)}>
        log out
      </Link>
    </div>
  );
}

export default Welcome;
