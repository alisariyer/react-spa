import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import Page404 from "./Page404";

function App() {
  const [user, setUser] = useState("ali");
  return (
    <main>
      <Router>
        <Navigation user={user} />
        {user && <Welcome user={user} />}
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 user={user} />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
