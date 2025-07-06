import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdmissionScore.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Spinner } from "react-bootstrap";

const AdmissionScore = () => {
  const [allScores, setAllScores] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("/api/diem-chuan");
        const grouped = groupByUniversity(response.data);
        setAllScores(grouped);
        if (Object.keys(grouped).length > 0) {
          setSelectedUniversity(Object.keys(grouped)[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải điểm chuẩn:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const groupByUniversity = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const uni = item.tenTruong;
      if (!grouped[uni]) grouped[uni] = [];
      grouped[uni].push({
        name: item.nganh,
        score: item.diemChuan,
        code: item.maNganh || "N/A",
        subjects: item.toHopMon || "Chưa rõ",
      });
    });
    return grouped;
  };

  const majors = allScores[selectedUniversity] || [];

  return (
    <>
      <Navbar />
      <div className="admission-page-wrapper">
        <div className="admission-container">
          <h1 className="admission-title">🎓 Tra Cứu Điểm Chuẩn Đại Học</h1>
          <p className="admission-subtitle">
            Chọn trường để xem điểm chuẩn các ngành tuyển sinh
          </p>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <div className="admission-select">
                <label htmlFor="university">Trường Đại học:</label>
                <select
                  id="university"
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                >
                  {Object.keys(allScores).map((uni, index) => (
                    <option key={index} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admission-table-wrapper">
                <table className="admission-table">
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
                        <td className="highlight">{major.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdmissionScore;
