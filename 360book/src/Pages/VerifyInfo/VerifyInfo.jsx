import React from "react";
import "./VerifyInfo.css";
import { useNavigate, useLocation } from "react-router-dom";


const VerifyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state || {};

  const handleSubmit = () => {
    // TODO: Gửi thông tin lên server hoặc gọi API
    alert("Xác nhận thành công! Cảm ơn bạn đã đăng ký.");
    navigate("/");
  };

  const handleEdit = () => {
    navigate("/register", { state: userInfo });
  };

  return (
    <>
      
      <div className="verify-wrapper">
        <h1 className="verify-title">📄 Xác Nhận Thông Tin Đăng Ký</h1>
        <p className="verify-subtitle">Vui lòng kiểm tra kỹ trước khi xác nhận</p>

        <div className="verify-card">
          <table className="verify-table">
            <tbody>
              <tr>
                <td>Họ và Tên</td>
                <td>{userInfo.fullName}</td>
              </tr>
              <tr>
                <td>Số báo danh</td>
                <td>{userInfo.examId}</td>
              </tr>
              <tr>
                <td>Tỉnh/Thành phố</td>
                <td>{userInfo.city}</td>
              </tr>
              <tr>
                <td>Tổ hợp môn</td>
                <td>{userInfo.subjects}</td>
              </tr>
              <tr>
                <td>Nguyện vọng 1</td>
                <td>{userInfo.choice1}</td>
              </tr>
              <tr>
                <td>Nguyện vọng 2</td>
                <td>{userInfo.choice2}</td>
              </tr>
              {/* Thêm các dòng khác nếu có */}
            </tbody>
          </table>

          <div className="verify-buttons">
            <button className="btn-edit" onClick={handleEdit}>📝 Chỉnh sửa</button>
            <button className="btn-confirm" onClick={handleSubmit}>✅ Xác nhận</button>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default VerifyInfo;
