import React, { useState } from "react";
import "./UniCompare.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import universities from "../../Data/universitiesMock";

const UniCompare = () => {
  const [uni1, setUni1] = useState("");
  const [uni2, setUni2] = useState("");
  const [major, setMajor] = useState("");

  const getUniData = (name) => universities.find((u) => u.name === name);
  const getMajorInfo = (uni, majorName) =>
    uni?.majors.find((m) => m.name.toLowerCase() === majorName.toLowerCase());

  const uniData1 = getUniData(uni1);
  const uniData2 = getUniData(uni2);

  const major1 = getMajorInfo(uniData1, major);
  const major2 = getMajorInfo(uniData2, major);

  return (
    <>
      <Navbar />
      <div className="compare-container">
        <h1 className="compare-title">So sánh ngành học giữa 2 trường</h1>
        <p className="compare-description">Nhập tên 2 trường và tên ngành để xem thông tin chi tiết.</p>

        <div className="compare-inputs">
          <input
            type="text"
            placeholder="Trường thứ 1"
            value={uni1}
            onChange={(e) => setUni1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Trường thứ 2"
            value={uni2}
            onChange={(e) => setUni2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ngành học"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>

        {major1 && major2 ? (
          <table className="compare-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>{uni1}</th>
                <th>{uni2}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Điểm chuẩn</td>
                <td>{major1.admissionScore}</td>
                <td>{major2.admissionScore}</td>
              </tr>
              <tr>
                <td>Học phí</td>
                <td>{major1.tuition}</td>
                <td>{major2.tuition}</td>
              </tr>
              <tr>
                <td>Đánh giá (⭐)</td>
                <td>{major1.rating}</td>
                <td>{major2.rating}</td>
              </tr>
              <tr>
                <td>Tỉ lệ việc làm</td>
                <td>{major1.employmentRate}</td>
                <td>{major2.employmentRate}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="compare-hint">Vui lòng nhập chính xác 2 trường và ngành để xem so sánh.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UniCompare;
