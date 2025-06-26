import React, { useState } from "react";
import "./ManageQA.css";
import { FaThumbtack, FaReply, FaTrash } from "react-icons/fa";

const sampleQA = [
  {
    id: 1,
    question: "Em nên chọn ngành nào nếu thích cả Toán và Hóa?",
    answer: "",
    isPinned: false,
    feedback: "Câu hỏi này hay, nên giải thích rõ ràng hơn.",
  },
  {
    id: 2,
    question: "Khi nào là hạn cuối đăng ký nguyện vọng?",
    answer: "Theo quy định của Bộ GD, hạn cuối là 30/6.",
    isPinned: true,
    feedback: "",
  },
];

const ManageQA = () => {
  const [qaList, setQaList] = useState(sampleQA);

  const togglePin = (id) => {
    setQaList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const updateAnswer = (id, answer) => {
    setQaList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, answer } : item))
    );
  };

  const removeQA = (id) => {
    setQaList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="manageqa-container">
      <h2>Quản lý Hỏi & Đáp</h2>
      {qaList.map((qa) => (
        <div
          key={qa.id}
          className={`qa-card ${qa.isPinned ? "pinned" : ""}`}
        >
          <div className="qa-header">
            <p className="question">{qa.question}</p>
            <div className="qa-actions">
              <button onClick={() => togglePin(qa.id)} title="Ghim câu hỏi">
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
