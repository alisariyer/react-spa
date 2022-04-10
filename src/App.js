import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ref, onValue} from "firebase/database";
import { db, auth } from "./Firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import Page404 from "./Page404";
import { signInWithEmailAndPassword } from "firebase/auth";

function App() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    user: '',
    displayName: '',
    userId: ''
  });
  
  useEffect(() => {
    const reference = ref(db, 'user');
    onValue(reference, (snapshot) => {
      const currentUser = snapshot.val();
      setUserInfo(currentUser);
    });
  }, []);

  function registerUser(userName) {
    updateProfile(auth.currentUser, {
      displayName: userName
    }).then(() => {
      console.log(auth.currentUser);
      setUserInfo({
        user: null,
        displayName: auth.currentUser.displayName,
        userId: auth.currentUser.userId 
      });
      navigate('/meetings', { replace: true})
    })
  }

  return (
    <main>
        <Navigation user={userInfo.user} />
        {userInfo.user && <Welcome user={userInfo.displayName} />}
        <Routes>
          <Route path="/" element={<Home user={userInfo.user}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/register" element={<Register registerUser={registerUser}/>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </main>
  );
}

export default App;
