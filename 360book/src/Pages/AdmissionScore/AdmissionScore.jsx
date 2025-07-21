import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Spinner } from "react-bootstrap";
import "./AdmissionScore.css";

const AdmissionScore = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [filteredMajors, setFilteredMajors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch danh sách trường
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await axios.get("/api/uni/v1");
        const data = res.data.data || [];
        setUniversities(data);
        if (data.length > 0) {
          setSelectedUniversityId(data[0].universityId);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách trường:", error);
      }
    };

    fetchUniversities();
  }, []);

  // 2. Fetch danh sách ngành khi chọn trường
  useEffect(() => {
    const fetchMajors = async () => {
      if (!selectedUniversityId) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/uni/v1/major/by-uni?universityId=${selectedUniversityId}`);
        const majors = parseMajorRows(res.data.data || []);
        setFilteredMajors(majors);
      } catch (error) {
        console.error("Lỗi khi tải ngành:", error);
        setFilteredMajors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, [selectedUniversityId]);

  // Xử lý dữ liệu để render table
  const parseMajorRows = (majors) => {
    const result = [];

    majors.forEach((major) => {
      const year2024 = major.scoreOverview?.find((y) => y.year === 2024);
      if (!year2024 || !year2024.scoreDetails) return;

      const combos = major.combo?.length > 0
        ? major.combo
        : [{ codeCombination: "Chưa rõ", subjectName: ["Chưa rõ"] }];

      combos.forEach((combo) => {
        year2024.scoreDetails.forEach((scoreDetail) => {
          result.push({
            majorId: major.majorId,
            majorName: major.majorName,
            codeCombination: combo.codeCombination,
            subjectName: combo.subjectName.join(", "),
            scoreType: scoreDetail.type,
            score: scoreDetail.score
          });
        });
      });
    });

    return result;
  };

  return (
    <>
      <Navbar />
      <div className="admission-page-wrapper">
        <div className="admission-container">
          <h1 className="admission-title">🎓 Tra Cứu Điểm Chuẩn Đại Học</h1>
          <p className="admission-subtitle">
            Chọn trường đại học để xem điểm chuẩn theo ngành và tổ hợp môn
          </p>

          {/* Dropdown chọn trường */}
          <div className="admission-select mb-4">
            <label htmlFor="university-select">Trường Đại học:</label>
            <select
              id="university-select"
              className="form-select"
              value={selectedUniversityId}
              onChange={(e) => setSelectedUniversityId(e.target.value)}
            >
              {universities.map((uni) => (
                <option key={uni.universityId} value={uni.universityId}>
                  {uni.universityName}
                </option>
              ))}
            </select>
          </div>

          {/* Hiển thị bảng hoặc loader */}
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : filteredMajors.length > 0 ? (
            <div className="admission-table-wrapper">
              <table className="admission-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã Ngành</th>
                    <th>Tên Ngành</th>
                    <th>Tổ Hợp Môn</th>
                    <th>Loại Điểm</th>
                    <th>Điểm 2024</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMajors.map((row, index) => (
                    <tr key={`${row.majorId}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{row.majorId}</td>
                      <td>{row.majorName}</td>
                      <td>
                        <strong>{row.codeCombination}</strong>
                        <div className="text-muted small">{row.subjectName}</div>
                      </td>
                      <td>{row.scoreType}</td>
                      <td className="highlight">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">Không có dữ liệu ngành cho trường này.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdmissionScore;
