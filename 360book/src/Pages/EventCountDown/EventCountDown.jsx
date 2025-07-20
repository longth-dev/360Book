import React, { useEffect, useState } from "react";
import "./EventCountDown.css";
import DongHoCat from "../../assets/deadline.png";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EventCountDown = () => {
    const [ngayThiTotNghiep, setNgayThiTotNghiep] = useState('');
    const [ngayDangKiNguyenVong, setNgayDangKiNguyenVong] = useState('');
    const [ngayCongBoDiemThi, setNgayCongBoDiemThi] = useState('');
    const [ngayCongBoDiemChuanDot1, setNgayCongBoDiemChuanDot1] = useState('');
    const [ngayDanhGiaNangLucHCMLan1, setNgayDanhGiaNangLucHCMLan1] = useState('');
    const [ngayDanhGiaNangLucHCMLan2, setNgayDanhGiaNangLucHCMLan2] = useState('');
    const [ngayDanhGiaNangLucHNLan1, setNgayDanhGiaNangLucHNLan1] = useState('');
    const [ngayDanhGiaNangLucHNLan2, setNgayDanhGiaNangLucHNLan2] = useState('');
    const navigate = useNavigate();

    const fetchNgayThiTotNghiep = async () => {
        try {
            const response = await axios.get("/api/uni/countdown");
            setNgayThiTotNghiep(response.data);
            toast.success("fetch ngay thi tot nghiep thanh cong")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchNgayDangKiNguyenVong = async () => {
        try {
            const response = await axios.get("/api/ngay-dang-ki-nguyen-vong");
            setNgayDangKiNguyenVong(response.data);
            toast.success("fetch ngay dang ki nguyen vong thanh cobg")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchNgayCongBoDiemThi = async () => {
        try {
            const response = await axios.get("/api/cong-bo-diem-thi");
            setNgayCongBoDiemThi(response.data);
            toast.success("fetch ngay cong bo diem thi thanh cong")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchCongBoDiemChuanDot1 = async () => {
        try {
            const response = await axios.get("/api/cong-bo-diem-chuan");
            setNgayCongBoDiemChuanDot1(response.data);
            toast.success("fetch ngay cong bo diem chuan dot 1")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchNgayDanhGiaNangLucHCMLan1 = async () => {
        try {
            const response = await axios.get("/api/dgnl-hcm-dot1");
            setNgayDanhGiaNangLucHCMLan1(response.data);
            toast.success("fetchNgayDanhGiaNangLucHCMLan1 thanh cong")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchNgayDanhGiaNangLucHCMLan2 = async () => {
        try {
            const response = await axios.get("/api/dgnl-hcm-dot2");
            setNgayDanhGiaNangLucHCMLan2(response.data);
            toast.success("fetchNgayDanhGiaNangLucHCMLan2 thanh cong")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchNgayDanhGiaNangLucHNLan1 = async () => {
        try {
            const response = await axios.get("/api/dgnl-hn-dot1");
            setNgayDanhGiaNangLucHNLan1(response.data);
            toast.success("fetchNgayDanhGiaNangLucHNLan1")
        } catch (error) {
            console.log(error);
        }

    }
    const fetchNgayDanhGiaNangLucHNLan2 = async () => {
        try {
            const response = await axios.get("/api/dgnl-hn-dot2");
            setNgayDanhGiaNangLucHNLan2(response.data);
            toast.success("fetchNgayDanhGiaNangLucHNLan2")
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchNgayThiTotNghiep();
        fetchNgayDangKiNguyenVong();
        fetchNgayCongBoDiemThi();
        fetchCongBoDiemChuanDot1();
        fetchNgayDanhGiaNangLucHCMLan1();
        fetchNgayDanhGiaNangLucHCMLan2();
        fetchNgayDanhGiaNangLucHNLan1();
        fetchNgayDanhGiaNangLucHNLan2();
    })

    const calculateDaysLeft = (dateString) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        eventDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        return diffDays;
    };
    

    const currentYear = new Date().getFullYear();

    return (
        <>
            <Navbar />

            <div className="container py-5">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
                <h2 className="title mb-3" style={{ color: "#282E45", fontWeight: "800" }}>ĐẾM NGƯỢC NGÀY THI VÀ CÁC SỰ KIỆN QUAN TRỌNG KHÁC</h2>
                <p className="description">
                    Đồng hồ đếm ngược ngày thi tốt nghiệp THPT, thi đánh giá năng lực, đánh giá tư duy và các ngày tết, ngày lễ noel giáng sinh, ngày trung thu và các sự kiện ngày lễ quan trọng sẽ trả lời các câu hỏi còn bao nhiêu ngày nữa?, mấy ngày nữa? tới sự kiện
                </p>
                <h5 className="section-title mt-5" style={{ color: "#282E45" }}>Các Mốc Thời Gian Quan Trọng</h5>

                <div className="event-list">
                    {/* Sự kiện 1 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/ngay-thi-tot-nghiep")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Thi tốt nghiệp THPT {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayThiTotNghiep || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Lịch thi và lưu ý quan trọng</p> 
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box green">
                            <span className="label">Còn</span>
                            <span className="number">{ngayThiTotNghiep ? calculateDaysLeft(ngayThiTotNghiep) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>

                    {/* Sự kiện 2 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/ngay-dang-ki-nguyen-vong")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Đăng ký nguyện vọng xét tuyển ĐH {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayDangKiNguyenVong || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Thời gian đăng ký và lưu ý quan trọng</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box pink">
                            <span className="label">Còn</span>
                            <span className="number">{ngayDangKiNguyenVong ? calculateDaysLeft(ngayDangKiNguyenVong) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>

                    {/* Sự kiện 3 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/cong-bo-diem-thi")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Công bố điểm thi tốt nghiệp THPT {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayCongBoDiemThi || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box orange">
                            <span className="label">Còn</span>
                            <span className="number">{ngayCongBoDiemThi ? calculateDaysLeft(ngayCongBoDiemThi) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>

                    {/* Sự kiện 4 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/diem-chuan-dot-1")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Công bố điểm chuẩn Đại học {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayCongBoDiemChuanDot1 || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box blue">
                            <span className="label">Còn</span>
                            <span className="number">{ngayCongBoDiemChuanDot1 ? calculateDaysLeft(ngayCongBoDiemChuanDot1) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>
                    {/* Sự kiện 5 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/dgnl-dot1-hcm")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Đánh Giá Năng Lực - tại Hồ Chí Minh - Đợt 1 {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayDanhGiaNangLucHCMLan1 || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box red">
                            <span className="label">Còn</span>
                            <span className="number">{ngayDanhGiaNangLucHCMLan1 ? calculateDaysLeft(ngayDanhGiaNangLucHCMLan1) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>
                    {/* Sự kiện 6 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/dgnl-dot2-hcm")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Đánh Giá Năng Lực - tại Hồ Chí Minh - Đợt 2 {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayDanhGiaNangLucHCMLan2 || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box purple">
                            <span className="label">Còn</span>
                            <span className="number">{ngayDanhGiaNangLucHCMLan2 ? calculateDaysLeft(ngayDanhGiaNangLucHCMLan2) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>
                    {/* Sự kiện 7 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/dgnl-dot1-hn")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Đánh Giá Năng Lực - tại Hà Nội - Đợt 1 {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayDanhGiaNangLucHNLan1 || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box brown">
                            <span className="label">Còn</span>
                            <span className="number">{ngayDanhGiaNangLucHNLan1 ? calculateDaysLeft(ngayDanhGiaNangLucHNLan1) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>
                    {/* Sự kiện 8 */}
                    <div className="event-card" onClick={() => navigate("/dem-nguoc/dgnl-dot2-hn")}>
                        <img
                            src={DongHoCat}
                            alt="Đồng hồ cát"
                            className="event-icon"
                        />
                        <div className="event-info">
                            <strong>Đếm ngược ngày Đánh Giá Năng Lực - tại Hà Nội - Đợt 2 {currentYear}</strong>
                            <p className="event-date">Ngày diễn ra: {ngayDanhGiaNangLucHNLan2 || "Đang cập nhật..."}</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        {/* đợi api nè */}
                        <div className="countdown-box teal">
                            <span className="label">Còn</span>
                            <span className="number">{ngayDanhGiaNangLucHNLan2 ? calculateDaysLeft(ngayDanhGiaNangLucHNLan2) : "--"}</span>
                            <span className="label">ngày</span>
                        </div>
                    </div>

                </div>
            </div >
            <Footer />
        </>
    );
};

export default EventCountDown;
