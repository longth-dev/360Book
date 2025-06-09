import React, { useState } from "react";
import "./AdmissionScore.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const universities = [
  {
    name: "Đại học Bách Khoa",
    majors: [
      {
        name: "Công nghệ Thông tin",
        score: 27.5,
        code: "7480201",
        subjects: "A00, A01",
      },
      {
        name: "Kỹ thuật Cơ khí",
        score: 25.8,
        code: "7520103",
        subjects: "A00",
      },
    ],
  },
  {
    name: "Đại học Kinh tế Quốc dân",
    majors: [
      { name: "Kinh tế", score: 26.0, code: "7310101", subjects: "A00, D01" },
      {
        name: "Tài chính Ngân hàng",
        score: 25.5,
        code: "7340201",
        subjects: "A00, A01, D01",
      },
    ],
  },
  {
    name: "Đại học Ngoại thương",
    majors: [
      {
        name: "Quản trị Kinh doanh",
        score: 26.8,
        code: "7340101",
        subjects: "A00, A01, D01",
      },
      {
        name: "Kinh tế Quốc tế",
        score: 27.0,
        code: "7310106",
        subjects: "D01, D03, D04",
      },
    ],
  },
];

const AdmissionScore = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(
    universities[0].name
  );

  const majors =
    universities.find((u) => u.name === selectedUniversity)?.majors || [];

  return (
    <>
    <Navbar />
      <div className="diemchuan-container">
        <h1 className="diemchuan-title">Tra Cứu Điểm Chuẩn Đại Học</h1>
        <p className="diemchuan-subtitle">
          Chọn trường đại học để xem điểm chuẩn các ngành tuyển sinh
        </p>

        <div className="diemchuan-select">
          <label htmlFor="university">Trường Đại học:</label>
          <select
            id="university"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
          >
            {universities.map((u, index) => (
              <option key={index} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="diemchuan-content">
          <table className="diemchuan-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã Ngành</th>
                <th>Tên Ngành</th>
                <th>Tổ Hợp Môn</th>
                <th>Điểm Chuẩn</th>
              </tr>
            </thead>
            <tbody>
              {majors.map((major, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{major.code}</td>
                  <td>{major.name}</td>
                  <td>{major.subjects}</td>
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
