import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageQA.css";
import { FaThumbtack, FaReply, FaTrash } from "react-icons/fa";

const API_BASE = "http://localhost:3000/api"; // cập nhật URL API thực tế nếu khác

const ManageQA = () => {
  const [qaList, setQaList] = useState([]);

  useEffect(() => {
    fetchQA();
  }, []);

  const fetchQA = async () => {
    try {
      const res = await axios.get(`${API_BASE}/qa`);
      setQaList(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu Q&A:", err);
    }
  };

  const togglePin = async (id, currentPin) => {
    try {
      await axios.put(`${API_BASE}/qa/${id}/pin`, { isPinned: !currentPin });
      setQaList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isPinned: !item.isPinned } : item
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật ghim:", err);
    }
  };

  const updateAnswer = async (id, answer) => {
    try {
      await axios.put(`${API_BASE}/qa/${id}/answer`, { answer });
      setQaList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, answer } : item))
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật trả lời:", err);
    }
  };

  const removeQA = async (id) => {
    try {
      await axios.delete(`${API_BASE}/qa/${id}`);
      setQaList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Lỗi khi xoá câu hỏi:", err);
    }
  };

  return (
    <div className="manageqa-container">
      <h2>Quản lý Hỏi & Đáp</h2>
      {qaList.map((qa) => (
        <div key={qa.id} className={`qa-card ${qa.isPinned ? "pinned" : ""}`}>
          <div className="qa-header">
            <p className="question">{qa.question}</p>
            <div className="qa-actions">
              <button onClick={() => togglePin(qa.id, qa.isPinned)} title="Ghim câu hỏi">
                <FaThumbtack />
              </button>
              <button onClick={() => removeQA(qa.id)} title="Xóa">
                <FaTrash />
              </button>
            </div>
          </div>
          {qa.feedback && (
            <div className="feedback">
              <strong>Phản hồi:</strong> {qa.feedback}
            </div>
          )}
          <div className="answer-section">
            <textarea
              placeholder="Nhập câu trả lời..."
              value={qa.answer}
              onChange={(e) => updateAnswer(qa.id, e.target.value)}
            />
            <button className="reply-btn">
              <FaReply /> Trả lời
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageQA;
