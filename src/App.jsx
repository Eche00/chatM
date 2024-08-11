import React, { useState, useEffect } from "react";
import GetUser from "./get/GetUser";
import GetAuth from "./get/GetAuth";
import { useUserStore } from "./lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // State to determine if the user is on a mobile device
  const { currentUser, fetchUserInfo } = useUserStore();

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
      {currentUser ? <GetUser /> : <GetAuth />}
      {/* Display the modal only on mobile devices */}
      {isMobile && <Modal />}
    </div>
  );
}

export default App;
