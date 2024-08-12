import React, { useEffect, useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ChatList.css";

const ChatList = ({ chats, onSelectChat }) => {
  const [filterText, setFilterText] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState(chats);
  const messagesEndRef = useRef(null);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    setMessage("");
    onSelectChat(chatId);
  };

  const handleSendMessage = () => {
    if (message !== "") {
      const updatedChats = chatList.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messageList: [...chat.messageList, { sender: "USER", message }],
          };
        }
        return chat;
      });
      setChatList(updatedChats);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const filteredChats = chatList.filter((chat) => {
    const titleMatch = chat.title
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const orderIdMatch = chat.orderId
      .toLowerCase()
      .includes(filterText.toLowerCase());
    return titleMatch || orderIdMatch;
  });

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList, selectedChatId]);

  return (
    <div className="chat-container">
      <div className="left-pane">
        <input
          type="text"
          placeholder="Search a chat..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <ul className="chat-list">
          {filteredChats.map((chat, index) => {
            return (
              <>
                <li
                  key={chat.id}
                  className={`chat-item ${
                    selectedChatId === chat.id ? "selected" : ""
                  }`}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <div className="chat-info">
                    <img src={chat.imageURL} alt={chat.title} />
                    <div className="chat-details">
                      <div className="chat-title">{chat.title}</div>

                      <div className="order-id">
                        {chat?.messageList?.length
                          ? chat?.messageList[chat?.messageList?.length - 1]
                              .message
                          : ""}
                      </div>
                    </div>
                    <div className="last-message-date">
                      {chat.latestMessageTimestamp}
                    </div>
                  </div>
                </li>
                {index !== filteredChats.length - 1 && (
                  <hr className="divider" />
                )}
              </>
            );
          })}
        </ul>
      </div>
      <div className="right-pane">
        {selectedChatId ? (
          <div className="chat-box">
            <div className="chat-header">
              <div className="chat-header-left">
                <img
                  src={
                    chatList.find((chat) => chat.id === selectedChatId)
                      ?.imageURL
                  }
                  alt="Chat"
                  className="chat-header-image"
                />
                <div className="chat-header-title">
                  {chatList.find((chat) => chat.id === selectedChatId)?.title}
                </div>
              </div>
              <div className="chat-header-icons">
                <i className="fa-solid fa-phone"></i>
                <i className="fa-solid fa-video"></i>
              </div>
            </div>
            <div className="messages-container">
              {chatList
                .find((chat) => chat.id === selectedChatId)
                ?.messageList.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "USER" ? "user-message" : "bot-message"
                    }`}
                  >
                    {message.message}
                    {message.sender === "USER" && (
                      <span className="message-status">{message.status}</span>
                    )}
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="no-chat-selected">
            Please select a chat 💬 to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
