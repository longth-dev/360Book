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
    const navigate = useNavigate();

    const fetchNgayThiTotNghiep = async () => {
        try {
            const response = await axios.get("/api/ngay-thi-tot-nghiep");
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
            const response = await axios.get("/api/cong-bo-diem-chuan-dot-1");
            setNgayCongBoDiemChuanDot1(response.data);
            toast.success("fetch ngay cong bo diem chuan dot 1")
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchNgayThiTotNghiep();
        fetchNgayDangKiNguyenVong();
        fetchNgayCongBoDiemThi();
        fetchCongBoDiemChuanDot1();
    })

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
                            <strong>Đếm ngược ngày Thi tốt nghiệp THPT 2025</strong>
                            <p className="event-date">Ngày diễn ra: 26 - 27/6/2025</p>
                            <p className="event-note">→ Xem chi tiết Lịch thi và lưu ý quan trọng</p>
                        </div>
                        <div className="countdown-box green">
                            <span className="label">Còn</span>
                            <span className="number">35</span>
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
                            <strong>Đếm ngược ngày Đăng ký nguyện vọng xét tuyển ĐH 2025</strong>
                            <p className="event-date">Ngày diễn ra: 16/7 - 17h 28/7/2025</p>
                            <p className="event-note">→ Xem chi tiết Thời gian đăng ký và lưu ý quan trọng</p>
                        </div>
                        <div className="countdown-box pink">
                            <span className="label">Còn</span>
                            <span className="number">55</span>
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
                            <strong>Đếm ngược ngày Công bố điểm thi tốt nghiệp THPT 2025</strong>
                            <p className="event-date">Ngày diễn ra: 8h00 ngày 16/7/2025</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        <div className="countdown-box orange">
                            <span className="label">Còn</span>
                            <span className="number">107</span>
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
                            <strong>Đếm ngược ngày Công bố điểm chuẩn Đại học 2025 đợt 1</strong>
                            <p className="event-date">Ngày diễn ra: 8h00 ngày 16/7/2025</p>
                            <p className="event-note">→ Xem chi tiết Ngày công bố điểm và các bước tiếp theo</p>
                        </div>
                        <div className="countdown-box blue">
                            <span className="label">Còn</span>
                            <span className="number">55</span>
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
