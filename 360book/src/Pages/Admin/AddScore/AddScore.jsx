import React, { useState } from "react";
import "./AddScore.css";

const AddScore = () => {
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
    console.log("Dữ liệu gửi:", formData);
    // TODO: gửi formData lên server
  };

  return (
    <div className="addscore-container">
      <h2 className="addscore-title">Thêm điểm chuẩn</h2>
      <form className="addscore-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="university">Tên trường</label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="VD: Đại học Kinh tế Quốc dân"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">Ngành</label>
          <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="VD: Kế toán"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="score">Điểm chuẩn</label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            placeholder="VD: 26.5"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Năm tuyển sinh</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="VD: 2025"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Lưu thông tin</button>
      </form>
    </div>
  );
};

export default AddScore;
