import React, { useEffect } from "react";
import Chat from "./Chat/Chat";
import List from "./List/List";
import Details from "./Details/Details";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useChatStore } from "../lib/chatStore";

function Home() {
  const navigate = useNavigate();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user);
        fetchUserInfo(user.uid);
      } else {
        console.log("No user authenticated");
        navigate("/");
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo, navigate]);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="font-[36px] bg-[#081b29] w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[200px] h-[200px] text-white">
          <Spinner size="medium" />
          <p className="text-5xl text-white p-10">Loading</p>
        </div>
      </div>
    );
  }

  // Check currentUser and chatId
  if (!currentUser) {
    return (
      <div className="w-[100%] h-screen flex items-center justify-center bg-black text-white">
        <p>No user is logged in. Please log in.</p>
      </div>
    );
  }

  // Render main content if user is authenticated
  return (
    <div className="w-[100%] h-screen flex items-center justify-center bg-black">
      <div className="bg-[#081b29] h-[90%] w-[90%] rounded-md flex text-white">
        <List />
        {chatId ? (
          <>
            <Chat />
            <Details />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
