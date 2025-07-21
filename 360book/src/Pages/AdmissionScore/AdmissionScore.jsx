import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Spinner } from "react-bootstrap";
import "./AdmissionScore.css";

const scoreTypeMap = {
  DGNLHCM: "Đánh giá năng lực HCM",
  DGNLHN: "Đánh giá năng lực HN",
  TNTHPTQG: "THPT quốc gia",
  HOCBA: "Học bạ"
  // … thêm mapping nếu cần
};

const AdmissionScore = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [loading, setLoading] = useState(true);

  // pivot data per-year
  const [majorsByYear, setMajorsByYear] = useState({});
  const [typesByYear, setTypesByYear] = useState({});
  const [years, setYears] = useState([]);

  const allScoreTypes = Object.keys(scoreTypeMap);

  // 1. Fetch danh sách trường
  useEffect(() => {
    axios.get("/api/uni/v1")
      .then(res => {
        const data = res.data.data || [];
        setUniversities(data);
        if (data.length) setSelectedUniversityId(data[0].universityId);
      })
      .catch(err => console.error(err));
  }, []);

  // 2. Khi chọn trường, fetch và pivot majors
  useEffect(() => {
    if (!selectedUniversityId) return;
    setLoading(true);

    axios.get(`/api/uni/v1/major/by-uni?universityId=${selectedUniversityId}`)
      .then(res => {
        const raw = res.data.data || [];
        const byYear = {};
        const typesYear = {};

        raw.forEach(major => {
          const combos = major.combo?.length
            ? major.combo
            : [{ codeCombination: "Chưa rõ", subjectName: ["Chưa rõ"] }];

          (major.scoreOverview || []).forEach(({ year, scoreDetails }) => {
            // init containers
            if (!byYear[year]) byYear[year] = [];
            if (!typesYear[year]) typesYear[year] = new Set();

            // build map type→score
            const scoresMap = {};
            scoreDetails.forEach(({ type, score }) => {
              typesYear[year].add(type);
              scoresMap[type] = score;
            });

            byYear[year].push({
              majorId: major.majorId,
              majorCode: major.majorCode,
              majorName: major.majorName,
              combos,
              scoresMap
            });
          });
        });

        // chuyển Set → Array và sort năm
        const typesByYearArr = {};
        Object.keys(typesYear).forEach(y => {
          typesByYearArr[y] = Array.from(typesYear[y]);
        });

        setMajorsByYear(byYear);
        setTypesByYear(typesByYearArr);
        setYears(
          Object
            .keys(byYear)
            .sort((a, b) => parseInt(b) - parseInt(a))
        );
      })
      .catch(err => {
        console.error(err);
        setMajorsByYear({});
        setTypesByYear({});
        setYears([]);
      })
      .finally(() => setLoading(false));
  }, [selectedUniversityId]);

  return (
    <>
      <Navbar />
      <div className="admission-page-wrapper">
        <div className="admission-container">
          <h1 className="admission-title">🎓 Tra Cứu Điểm Chuẩn Đại Học</h1>

          {/* Dropdown chọn trường */}
          <div className="admission-select mb-4">
            <label htmlFor="university-select">Trường Đại học:</label>
            <select
              id="university-select"
              className="form-select"
              value={selectedUniversityId}
              onChange={e => setSelectedUniversityId(e.target.value)}
            >
              {universities.map(u => (
                <option key={u.universityId} value={u.universityId}>
                  {u.universityName}
                </option>
              ))}
            </select>
          </div>

          {/* Loader */}
          {loading && (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {/* Tables per year */}
          {!loading && years.length > 0
            ? years.map(year => (
              <div key={year} className="mb-5">
                <h2>Năm {year}</h2>
                <div className="admission-table-wrapper">
                  <table className="admission-table w-100">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã Ngành</th>
                        <th>Tên Ngành</th>
                        <th>Tổ Hợp Môn</th>
                        {allScoreTypes.map(type => (
                          <th key={type}>{scoreTypeMap[type]}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {majorsByYear[year].map((item, idx) => (
                        <tr key={`${year}-${item.majorId}`}>
                          <td>{idx + 1}</td>
                          <td>{item.majorCode}</td>
                          <td>{item.majorName}</td>
                          <td>
                            <strong>
                              {item.combos.map(c => c.codeCombination).join(", ")}
                            </strong>
                          </td>
                          {allScoreTypes.map(type => (
                            <td key={type} className="highlight">
                              {item.scoresMap[type] ?? "–"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
            : !loading && (
              <p className="text-muted">
                Không có dữ liệu ngành cho trường này.
              </p>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AdmissionScore;
