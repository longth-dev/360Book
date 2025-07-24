import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import "./CommunityChat.css";

const CommunityChat = () => {
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState("");
  const [replyMap, setReplyMap] = useState({});
  const [userRole, setUserRole] = useState("user"); // mặc định là user

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await axios.get("/api/communityChats/getAllChats");
      setChats(res.data || []);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  const sendChat = async () => {
    if (!newChat.trim()) return;
    try {
      await axios.post("/api/communityChats/create", { content: newChat });
      setNewChat("");
      fetchChats();
    } catch (error) {
      console.error("Error sending chat", error);
    }
  };

  const sendReply = async (chatId) => {
    const replyContent = replyMap[chatId];
    if (!replyContent?.trim()) return;
    try {
      await axios.post(`/api/communityChats/replyChat/${chatId}`, {
        reply: replyContent,
      });
      setReplyMap({ ...replyMap, [chatId]: "" });
      fetchChats();
    } catch (error) {
      console.error("Error replying chat", error);
    }
  };

  const handleAdminAction = async (action, chatId) => {
    try {
      await axios.put(`/api/communityChats/${action}/${chatId}`);
      fetchChats();
    } catch (error) {
      console.error(`${action} failed`, error);
    }
  };

  const pinnedChats = chats.filter((chat) => chat.pinned);
  const normalChats = chats.filter((chat) => !chat.pinned);

  return (
    <div className="community-chat-page">
      <Navbar />

      <div className="chat-container">
        <h1 className="chat-title">🌍 360Book Community</h1>

        {pinnedChats.length > 0 && (
          <div className="pinned-section">
            <h2>📌 Tin nhắn được ghim</h2>
            {pinnedChats.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                isAdmin={userRole === "admin"}
                replyMap={replyMap}
                setReplyMap={setReplyMap}
                sendReply={sendReply}
                handleAdminAction={handleAdminAction}
              />
            ))}
          </div>
        )}

        <div className="chat-list-section">
          <h2>🗨️ Tất cả tin nhắn</h2>
          {normalChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              isAdmin={userRole === "admin"}
              replyMap={replyMap}
              setReplyMap={setReplyMap}
              sendReply={sendReply}
              handleAdminAction={handleAdminAction}
            />
          ))}
        </div>

        <div className="new-chat-box">
          <textarea
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
            placeholder="Chia sẻ điều gì đó với cộng đồng..."
          />
          <button onClick={sendChat}>Gửi</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ChatCard = ({
  chat,
  isAdmin,
  replyMap,
  setReplyMap,
  sendReply,
  handleAdminAction,
}) => (
  <div className="chat-card">
    <div className="chat-header">
      <strong>{chat.sender || "Người dùng ẩn danh"}</strong>
      <span className="timestamp">
        {new Date(chat.timestamp).toLocaleString()}
      </span>
    </div>

    <div className="chat-content">{chat.content}</div>

    {chat.reply && (
      <div className="chat-reply">
        <span className="reply-label">↳ Phản hồi:</span>
        <div className="reply-content">{chat.reply}</div>
      </div>
    )}

    <div className="chat-actions">
      <input
        type="text"
        placeholder="Trả lời..."
        value={replyMap[chat.id] || ""}
        onChange={(e) =>
          setReplyMap((prev) => ({ ...prev, [chat.id]: e.target.value }))
        }
      />
      <button onClick={() => sendReply(chat.id)}>Trả lời</button>

      {isAdmin && (
        <>
          {chat.pinned ? (
            <button onClick={() => handleAdminAction("unPin", chat.id)}>
              Bỏ ghim
            </button>
          ) : (
            <button onClick={() => handleAdminAction("pin", chat.id)}>
              Ghim
            </button>
          )}
          <button
            onClick={() => handleAdminAction("delete", chat.id)}
            className="delete-btn"
          >
            Xóa
          </button>
        </>
      )}
    </div>
  </div>
);

export default CommunityChat;