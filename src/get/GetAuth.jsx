import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import SignUp from "../pages/Signup";
import Signin from "../pages/Signin";
import Notification from "../components/Notification/Notification";
import { useUserStore } from "../lib/userStore";
import Home from "../components/Home";

function GetAuth() {
  const { currentUser, fetchUserInfo } = useUserStore();

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
        {/* Display the modal only on mobile devices */}
      </Router>
    </div>
  );
}

export default GetAuth;
