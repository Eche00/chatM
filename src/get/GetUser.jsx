import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "../components/Notification/Notification";
import Home from "../components/Home";
import { useUserStore } from "../lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import SignUp from "../pages/Signup";
import Signin from "../pages/Signin";

function GetUser() {
  const { currentUser, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user);
        fetchUserInfo(user.uid);
      } else {
        console.log("No user authenticated");
        return <Home />;
      }
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <div>
      <Router>
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />

          <Route path="/home" element={<Home />} />
        </Routes>
        {/* Display the notification component */}
        <Notification />
      </Router>
    </div>
  );
}

export default GetUser;
