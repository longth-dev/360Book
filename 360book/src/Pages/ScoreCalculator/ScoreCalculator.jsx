import React from "react";
import "./ScoreCalculator.css";
import scoreEnglish from "../../assets/score-with-english.png"; // Replace with actual image path
import scoreCalculator from "../../assets/score-calculator.png"; // Replace with actual image path
import scoreAverage from "../../assets/average score.png"; // Replace with actual image path
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
const ScoreCalculator = () => {
  return (
    <>
      <Navbar />
      <div className="scorecalc-container">
        <section className="scorecalc-section card-shadow white-bg border-light">
          <h1 className="section-title-center">
            Cách tính điểm xét tốt nghiệp THPT năm 2025
          </h1>

          <article className="scorecalc-subsection">
            <p>
              Ngày <strong>24/12/2024</strong>, Bộ Giáo dục và Đào tạo đã ban
              hành Thông tư 24/2024/TT-BGDĐT về Quy chế thi tốt nghiệp THPT bắt
              đầu từ năm 2025.
            </p>
            <p>
              Một điểm mới quan trọng trong Quy chế này là phương thức tính điểm
              xét tốt nghiệp THPT, với trọng số:
            </p>
            <ul>
              <li>
                <strong>50%</strong> dựa trên kết quả học tập lớp 10, 11, 12
                (điểm trung bình từng năm học)
              </li>
              <li>
                <strong>50%</strong> từ điểm bài thi tốt nghiệp
              </li>
            </ul>
          </article>

          <article className="scorecalc-subsection">
            <h2>1. Công thức tính điểm xét tốt nghiệp </h2>
            <div className="formula-box">
              <img
                src={scoreCalculator}
                alt="Công thức tính điểm không miễn ngoại ngữ"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </article>

          <article className="scorecalc-subsection">
            <h2>
              2. Công thức tính điểm nếu sử dụng chứng chỉ ngoại ngữ để miễn thi
              môn ngoại ngữ
            </h2>
            <div className="formula-box">
              <img
                src={scoreEnglish}
                alt="Công thức tính điểm miễn thi ngoại ngữ"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </article>
          <article className="scorecalc-subsection">
            <h2>
              3. Công thức tính điểm trung bình cả năm tất cả các môn lớp 10,
              lớp 11, lớp 12
            </h2>
            <div className="formula-box">
              <img
                src={scoreAverage}
                alt="Công thức tính điểm trung bình các năm"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </article>
          <article className="scorecalc-subsection">
            <h2>4. Giải thích các thành phần</h2>
            <ul>
              <li>
                <strong>Điểm các năm học:</strong> Trung bình cộng của điểm
                trung bình lớp 10, lớp 11 và lớp 12.
              </li>
              <li>
                <strong>Điểm KK (nếu có):</strong> Là điểm khuyến khích từ các
                chứng chỉ nghề, thành tích học sinh giỏi, v.v.
              </li>
              <li>
                <strong>Điểm UT (nếu có):</strong> Là điểm ưu tiên theo khu vực,
                đối tượng chính sách.
              </li>
            </ul>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ScoreCalculator;
