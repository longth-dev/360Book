
import React, { useState } from "react";
import "./UpdateScore.css"; // Ensure you have this CSS file for styling

const UpdateScore = () => {
  const [formData, setFormData] = useState({
    university: "",
    major: "",
    score: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã cập nhật:", formData);
    // TODO: Gửi dữ liệu cập nhật
  };

  return (
    <div className="score-container">
      <h2 className="score-title">Cập nhật điểm chuẩn</h2>
      <form className="score-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên trường</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngành</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Điểm chuẩn mới</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label>Năm</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateScore;
