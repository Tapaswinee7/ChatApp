import React, { useState, useEffect } from "react";
import ChatList from "./chatApp/ChatList";
import { chatDetails } from "./chatApp/ChatDetails";
import "./App.css";

function App() {
  const [chats, setChats] = useState(chatDetails);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    const updatedChats = chats.map((chat) => ({
      ...chat,
      selected: chat.id === chatId ? true : false,
    }));
    setChats(updatedChats);
  };

  return (
    <div className="App">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
    </div>
  );
}

export default App;
