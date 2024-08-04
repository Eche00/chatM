import { SearchRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Searchchat from "./Searchchat";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { profile } from "../../../assets";
import { useChatStore } from "../../../lib/chatStore";

function Chatlist() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setUserChats] = useState([]);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) {
      console.error("User ID is not defined");
      return;
    }

    const userChatsRef = doc(db, "userchats", currentUser.id);

    const unSub = onSnapshot(
      userChatsRef,
      async (res) => {
        try {
          const data = res.data();
          if (!data || !Array.isArray(data.chats)) {
            console.error("Invalid chat data format");
            return;
          }

          const items = data.chats;

          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            return { ...item, user: userDocSnap.data() };
          });

          const chatData = await Promise.all(promises);
          const sortedChatData = chatData.sort((a, b) => b.updatedAt - a.updatedAt);

          setUserChats(sortedChatData);
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      },
      (error) => {
        console.error("Error in onSnapshot:", error);
      }
    );

    return () => unSub();
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    if (!chat || !chat.chatId) {
      console.error("Invalid chat data");
      return;
    }

    const updatedChats = chats.map((item) => {
      if (item.chatId === chat.chatId) {
        return { ...item, isSeen: true };
      }
      return item;
    });

    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, { chats: updatedChats });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.error("Error updating chat data:", error);
    }
  };

  const filteredChats = chats.filter((e) =>
    e.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center px-[20px] gap-[20px]">
        <div className="flex items-center flex-1 bg-gray-700 rounded-md py-1">
          <span className="px-2">
            <SearchRounded fontSize="medium" />
          </span>
          <input
            className="flex-1 bg-transparent outline-none"
            type="text"
            placeholder="search..."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div
          className="flex items-center text-2xl bg-gray-700 px-[10px] rounded-md cursor-pointer group relative"
          onClick={() => setAddMode((prev) => !prev)}
        >
          {addMode ? "-" : "+"}
          <p
            className={`opacity-0 group-hover:opacity-100 text-white absolute -left-[300%] bottom-0 top-[100%] text-sm bg-[rgba(55,65,81,0.60)] px-2 rounded-md z-50 text-nowrap ${!addMode ? 'opacity-100' : ''}`}
          >
            {addMode ? 'click to exit search user' : 'Click to search user'}
          </p>
        </div>
      </div>

      {!addMode && (
        <div className="flex flex-col">
          {filteredChats.length === 0 ? (
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-400 py-5 flex-wrap">
                You have no Chats, Click to search User
              </h2>
              <div
                className="flex items-center text-3xl bg-gray-700 px-[10px] rounded-md cursor-pointer group relative m-5"
                onClick={() => setAddMode((prev) => !prev)}
              >
                +
              </div>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                className="flex items-center border-b-2 border-gray-700 gap-[20px] p-[20px] hover:bg-[rgba(92,92,94,0.1)] cursor-pointer"
                key={chat.chatId}
                onClick={() => handleSelect(chat)}
              >
                <img
                  className="w-[50px] h-[50px] object-cover rounded-[50%]"
                  src={
                    chat.user.blocked.includes(currentUser.id)
                      ? profile
                      : chat.user.avatar || profile
                  }
                  alt=""
                />
                <div className="flex justify-between flex-1 items-center">
                  <div className="flex flex-col gap-[5px]">
                    <span className="font-bold">
                      {chat.user.blocked.includes(currentUser.id)
                        ? "User"
                        : chat.user.username}
                    </span>
                    <p
                      className="text-[14px] p-0"
                      style={{ color: chat.isSeen ? "white" : "gray-300" }}
                    >
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="text-gray-300 text-xs font-bold">
                    {!chat.isSeen && (
                      <div className="w-[15px] h-[15px] bg-[#5183fe] rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {addMode && <Searchchat setAddMode={setAddMode} />}
    </div>
  );
}

export default Chatlist;
