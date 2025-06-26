import React, { useEffect, useState } from "react";
import "./ViewScores.css";
import { fetchScores } from "../../../api/scoreService";

const ViewScore = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await fetchScores();
        setScores(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách điểm:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  return (
    <div className="viewscores-container">
      <h2 className="viewscores-title">Danh sách điểm chuẩn</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : scores.length === 0 ? (
        <p>Chưa có dữ liệu.</p>
      ) : (
        <table className="viewscores-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Trường</th>
              <th>Ngành</th>
              <th>Điểm chuẩn</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.school}</td>
                <td>{item.major}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewScore;
