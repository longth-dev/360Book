import React, { useState } from "react";
import "./AdmissionScore.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const AdmissionScore = () => {
  // Sample data for universities, majors, and scores
  const universities = [
    {
      name: "Đại học Bách Khoa",
      majors: [
        { name: "Công nghệ Thông tin", score: 27.5 },
        { name: "Kỹ thuật Cơ khí", score: 25.8 },
      ],
    },
    {
      name: "Đại học Kinh tế Quốc dân",
      majors: [
        { name: "Kinh tế", score: 26.0 },
        { name: "Tài chính Ngân hàng", score: 25.5 },
      ],
    },
    {
      name: "Đại học Ngoại thương",
      majors: [
        { name: "Quản trị Kinh doanh", score: 26.8 },
        { name: "Kinh tế Quốc tế", score: 27.0 },
      ],
    },
  ];

  // State to track selected university
  const [selectedUniversity, setSelectedUniversity] = useState(
    universities[0].name
  );

  // Handle university selection change
  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

  // Get majors for the selected university
  const selectedUni = universities.find(
    (uni) => uni.name === selectedUniversity
  );
  const majors = selectedUni ? selectedUni.majors : [];

  return (
    <>
    <Navbar />
      <div className="diemchuan-container">
        <h1 className="diemchuan-title">Điểm Chuẩn Đại Học</h1>
        <p className="diemchuan-subtitle">
          Chọn trường và ngành học phù hợp với điểm chuẩn của bạn!
        </p>
        <div className="diemchuan-select">
          <label htmlFor="university-select">Chọn trường đại học:</label>
          <select
            id="university-select"
            value={selectedUniversity}
            onChange={handleUniversityChange}
          >
            {universities.map((uni) => (
              <option key={uni.name} value={uni.name}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>
        <div className="diemchuan-content">
          <table className="diemchuan-table">
            <thead>
              <tr>
                <th>Ngành</th>
                <th>Điểm Chuẩn</th>
              </tr>
            </thead>
            <tbody>
              {majors.map((major, index) => (
                <tr key={index}>
                  <td>{major.name}</td>
                  <td>{major.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdmissionScore;
