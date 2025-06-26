import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddScore.css";
import { submitScore } from "../../../api/scoreService";

const AddScore = () => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ hook để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!school || !major || score === "") {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 30) {
      setMessage("Điểm phải nằm trong khoảng từ 0 đến 30.");
      return;
    }

    try {
      await submitScore(school, major, numericScore);
      // ✅ Chuyển hướng sau khi gửi thành công
      navigate("/admin/diem-chuan/view");
    } catch (error) {
      console.error(error);
      setMessage("Lỗi khi gửi điểm.");
    }
  };

  return (
    <div className="addscore-container">
      <h2 className="addscore-title">Thêm điểm chuẩn</h2>
      <form onSubmit={handleSubmit} className="addscore-form">
        <input
          type="text"
          placeholder="Trường"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="addscore-input"
        />
        <input
          type="text"
          placeholder="Ngành"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="addscore-input"
        />
        <input
          type="number"
          min="0"
          max="30"
          step="0.1"
          placeholder="Điểm chuẩn (0 - 30)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="addscore-input"
        />
        <button type="submit" className="addscore-button">Gửi</button>
      </form>
      {message && <p className="addscore-message">{message}</p>}
    </div>
  );
};

export default AddScore;
