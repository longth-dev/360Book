import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateScore = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [score, setScore] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(`/api/diem-chuan/${id}`);
        const data = response.data;

        setSchool(data.tenTruong || "");
        setMajor(data.nganh || "");
        setScore(data.diemChuan || "");
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu điểm chuẩn:", error);
        toast.error("❌ Không thể tải dữ liệu điểm chuẩn.");
      }
    };

    fetchScore();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!school || !major || score === "") {
      toast.error("❌ Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 30) {
      toast.warning("⚠️ Điểm chuẩn phải nằm trong khoảng từ 0 đến 30.");
      return;
    }

    try {
      await axios.put(`/api/diem-chuan/${id}`, {
        tenTruong: school,
        nganh: major,
        diemChuan: numericScore,
      });

      toast.success("✅ Cập nhật điểm chuẩn thành công!");

      setTimeout(() => {
        navigate("/admin/diem-chuan/view");
      }, 1500);
    } catch (error) {
      console.error("Lỗi cập nhật điểm chuẩn:", error);
      toast.error("❌ Cập nhật điểm chuẩn thất bại.");
    }
  };

  return (
    <div className="container p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-center text-warning mb-4">✏️ Cập nhật điểm chuẩn</h2>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
            <div className="mb-3">
              <label className="form-label fw-bold">Tên trường</label>
              <input
                type="text"
                className="form-control"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Ngành học</label>
              <input
                type="text"
                className="form-control"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Điểm chuẩn (0 - 30)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="30"
                step="0.1"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 text-white">
              🔄 Cập nhật điểm chuẩn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateScore;
