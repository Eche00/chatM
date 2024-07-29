import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./components/Home";
import Notification from "./components/Notification/Notification";
import Modal from "./components/Modal";

function App() {
  // State to determine if the user is on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the window width is less than or equal to 768px
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add resize event listener to handle window size changes
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
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
        {/* Display the modal only on mobile devices */}
        {isMobile && <Modal />}
      </Router>
    </div>
  );
}

export default App;
