import { useState } from "react";
import "./ScoreForm.css";

const ScoreForm = () => {
  const [data, setData] = useState({
    literature: "",
    math: "",
    elective: "",
    english: "",
    isEnglishExempted: false,
    bonus: "",
    priority: "",
    result: null,
  });

  const [grades, setGrades] = useState({
    grade10: {},
    grade11: {},
    grade12: {},
  });

  const [errors, setErrors] = useState({});

  const subjects = [
    "Văn",
    "Toán",
    "Tiếng Anh",
    "Sử",
    "Địa",
    "GDKTPL",
    "Lí",
    "Hóa",
    "Sinh",
    "Tin",
    "Công nghệ",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (type !== "checkbox") {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0 || num > 10) {
        setErrors((prev) => ({ ...prev, [name]: "Điểm phải từ 0 đến 10" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }

    setData((prev) => ({ ...prev, [name]: val }));
  };

  const handleGradeChange = (e, year, subject) => {
    const value = e.target.value;
    const num = parseFloat(value);

    if (isNaN(num) || num < 0 || num > 10) {
      setErrors((prev) => ({
        ...prev,
        [`${year}-${subject}`]: "Điểm phải từ 0 đến 10",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [`${year}-${subject}`]: null,
      }));
    }

    setGrades((prev) => ({
      ...prev,
      [year]: {
        ...prev[year],
        [subject]: value,
      },
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
    } = data;

    const lit = parseFloat(literature) || 0;
    const mat = parseFloat(math) || 0;
    const ele = parseFloat(elective) || 0;
    const eng = parseFloat(english) || 0;
    const kk = parseFloat(bonus) || 0;
    const ut = parseFloat(priority) || 0;

    const avgYear = (grade) => {
      const values = Object.values(grades[grade])
        .map((v) => parseFloat(v))
        .filter((v) => !isNaN(v));
      if (values.length === 0) return 0;
      return values.reduce((a, b) => a + b, 0) / values.length;
    };

    const avg10 = avgYear("grade10");
    const avg11 = avgYear("grade11");
    const avg12 = avgYear("grade12");

    const avgSchoolYears = (avg10 + avg11 * 2 + avg12 * 3) / 6;

    let avgExam = 0;
    if (isEnglishExempted) {
      avgExam = (lit + mat + ele) / 3 + kk / 4;
    } else {
      avgExam = (lit + mat + ele + eng + kk) / 4;
    }

    const total = ((avgExam + avgSchoolYears) / 2 + ut).toFixed(2);
    setData((prev) => ({ ...prev, result: total }));
  };

  return (
    <div className="scoreform-wrapper">
      <h2>5. Tính điểm xét tốt nghiệp</h2>
      <form className="scoreform-grid">
        <div className="scoreform-group">
          <label>Điểm Ngữ văn:</label>
          <input
            type="number"
            name="literature"
            step="0.01"
            onChange={handleChange}
          />
          {errors.literature && <p className="error-msg">{errors.literature}</p>}
        </div>
        <div className="scoreform-group">
          <label>Điểm Toán:</label>
          <input
            type="number"
            name="math"
            step="0.01"
            onChange={handleChange}
          />
          {errors.math && <p className="error-msg">{errors.math}</p>}
        </div>
        <div className="scoreform-group">
          <label>Điểm môn tự chọn:</label>
          <input
            type="number"
            name="elective"
            step="0.01"
            onChange={handleChange}
          />
          {errors.elective && <p className="error-msg">{errors.elective}</p>}
        </div>
        <div className="scoreform-group scoreform-checkbox">
          <input
            type="checkbox"
            name="isEnglishExempted"
            onChange={handleChange}
          />
          <label>Miễn thi môn tiếng Anh?</label>
        </div>
        {!data.isEnglishExempted && (
          <div className="scoreform-group">
            <label>Điểm tiếng Anh:</label>
            <input
              type="number"
              name="english"
              step="0.01"
              onChange={handleChange}
            />
            {errors.english && <p className="error-msg">{errors.english}</p>}
          </div>
        )}
        <div className="scoreform-group">
          <label>Điểm khuyến khích (nếu có):</label>
          <input
            type="number"
            name="bonus"
            step="0.01"
            onChange={handleChange}
          />
          {errors.bonus && <p className="error-msg">{errors.bonus}</p>}
        </div>
        <div className="scoreform-group">
          <label>Điểm ưu tiên (nếu có):</label>
          <input
            type="number"
            name="priority"
            step="0.01"
            onChange={handleChange}
          />
          {errors.priority && <p className="error-msg">{errors.priority}</p>}
        </div>
      </form>

      <h3>Bảng điểm trung bình các môn học</h3>
      {["grade10", "grade11", "grade12"].map((yearKey, i) => (
        <div key={yearKey}>
          <h4>Lớp {i + 10}</h4>
          <table className="scoreform-table">
            <thead>
              <tr>
                {subjects.map((subj) => (
                  <th key={subj}>{subj}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {subjects.map((subj) => (
                  <td key={subj}>
                    <input
                      type="number"
                      step="0.01"
                      value={grades[yearKey][subj] || ""}
                      onChange={(e) => handleGradeChange(e, yearKey, subj)}
                    />
                    {errors[`${yearKey}-${subj}`] && (
                      <p className="error-msg">
                        {errors[`${yearKey}-${subj}`]}
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <button className="scoreform-btn" onClick={calculate}>
        Tính điểm
      </button>

      {data.result && (
        <p className="scoreform-result">
          ✅ Điểm xét tốt nghiệp của bạn là: <strong>{data.result}</strong>
        </p>
      )}
    </div>
  );
};

export default ScoreForm;
