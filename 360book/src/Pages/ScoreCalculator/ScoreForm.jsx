import { useState } from "react";
import "./ScoreForm.css"; // CSS riêng cho form

const ScoreForm = () => {
  const [data, setData] = useState({
    literature: "",
    math: "",
    elective: "",
    english: "",
    isEnglishExempted: false,
    bonus: "",
    priority: "",
    avg10: "",
    avg11: "",
    avg12: "",
    result: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    // Chỉ cho phép số từ 0 đến 10 và số thập phân
    if (
      type !== "checkbox" &&
      (isNaN(val) || parseFloat(val) < 0 || parseFloat(val) > 10)
    )
      return;

    setData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const calculate = () => {
    const {
      literature,
      math,
      elective,
      english,
      isEnglishExempted,
      bonus,
      priority,
      avg10,
      avg11,
      avg12,
    } = data;

    const lit = parseFloat(literature) || 0;
    const mat = parseFloat(math) || 0;
    const ele = parseFloat(elective) || 0;
    const eng = parseFloat(english) || 0;
    const kk = parseFloat(bonus) || 0;
    const ut = parseFloat(priority) || 0;

    const avgSchoolYears =
      (parseFloat(avg10) * 1 +
        parseFloat(avg11) * 2 +
        parseFloat(avg12) * 3) /
      6;

    let avgExam;
    if (isEnglishExempted) {
      avgExam = (lit + mat + ele) / 3 + kk / 4;
    } else {
      avgExam = (lit + mat + ele + eng + kk) / 4;
    }

    const total = ((avgExam + avgSchoolYears) / 2 + ut).toFixed(2);
    setData((prev) => ({ ...prev, result: total }));
  };

  return (
    <div className="scorecalc-subsection">
      <h2>5. Tính điểm xét tốt nghiệp</h2>
      <form className="score-form">
        <div className="form-group">
          <label>Điểm Ngữ văn:</label>
          <input type="number" step="0.01" max="10" name="literature" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Điểm Toán:</label>
          <input type="number" step="0.01" max="10" name="math" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Điểm môn tự chọn:</label>
          <input type="number" step="0.01" max="10" name="elective" onChange={handleChange} />
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" name="isEnglishExempted" onChange={handleChange} />
          <label>Miễn thi môn tiếng Anh?</label>
        </div>
        {!data.isEnglishExempted && (
          <div className="form-group">
            <label>Điểm tiếng Anh:</label>
            <input type="number" step="0.01" max="10" name="english" onChange={handleChange} />
          </div>
        )}
        <div className="form-group">
          <label>Điểm khuyến khích (nếu có):</label>
          <input type="number" step="0.01" max="10" name="bonus" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Điểm ưu tiên (nếu có):</label>
          <input type="number" step="0.01" max="10" name="priority" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Điểm TB lớp 10:</label>
          <input type="number" step="0.01" max="10" name="avg10" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Điểm TB lớp 11:</label>
          <input type="number" step="0.01" max="10" name="avg11" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Điểm TB lớp 12:</label>
          <input type="number" step="0.01" max="10" name="avg12" onChange={handleChange} />
        </div>
      </form>
      <button className="btn-calculate" onClick={calculate}>Tính điểm</button>
      {data.result && (
        <p className="score-result">
          ✅ Điểm xét tốt nghiệp của bạn là: <strong>{data.result}</strong>
        </p>
      )}
    </div>
  );
};

export default ScoreForm;
