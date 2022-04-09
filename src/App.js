import React, { useState } from "react";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Home user={user}/>
  );
}

export default App;
