import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onValue, push, ref } from "firebase/database";
import { db, auth } from "./Firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import Checkin from "./Checkin";
import Page404 from "./Page404";

function App() {
  const navigate = useNavigate();

  const resetUserInfo = () => ({user: null, displayName: null, userId: null});

  const [userInfo, setUserInfo] = useState(() => resetUserInfo());
  const [meetings, setMeetings] = useState({
    meetingList: [],
    numberOfMeetings: 0,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          user: user,
          displayName: user.displayName,
          userId: user.uid,
        });

        const meetingRef = ref(db, `meetings/${user.uid}`);
        onValue(meetingRef, (snapshot) => {
          const meetings = snapshot.val();
          const meetingList = []
          for (let item in meetings) {
            meetingList.push({
              meetingId: item,
              meetingName: meetings[item].meetingName
            })
          }
          setMeetings({meetingList: meetingList, numberOfMeetings: meetingList.length})
        });
      } else {
        setUserInfo(resetUserInfo())
      }
    });
  }, []);

  useEffect(() => {
    console.log(meetings);
  }, [meetings])

  function registerUser(userName) {
    updateProfile(auth.currentUser, {
      displayName: userName,
    }).then(() => {
      console.log(auth.currentUser);
      setUserInfo({
        user: auth.currentUser,
        displayName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
      });
      navigate("/meetings", { replace: true });
    });
  }

  function logOutUser(e) {
    e.preventDefault();
    setUserInfo(resetUserInfo());
    signOut(auth)
      .then(() => {
        console.log("suceessfully signed out");
        navigate("/login", { replace: true });
      })
      .catch((e) => console.log(e));
  }

  function addMeeting(meetingName) {
    push(ref(db, `meetings/${userInfo.user.uid}`), {
      meetingName: meetingName
    }).then(() => console.log('pushed')).catch(err => console.log(err))

  }

  return (
    <main>
      <Navigation user={userInfo.user} logOutUser={logOutUser}/>
      {userInfo.user && <Welcome userName={userInfo.displayName} logOutUser={logOutUser}/>}
      <Routes>
        <Route path="/" element={<Home user={userInfo.user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<Meetings addMeeting={addMeeting} meetings={meetings} userId={userInfo.userId}/>} />
        <Route path="/checkin/:userId/:meetingId" element={<Checkin />} />
        <Route
          path="/register"
          element={<Register registerUser={registerUser} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
}

export default App;
