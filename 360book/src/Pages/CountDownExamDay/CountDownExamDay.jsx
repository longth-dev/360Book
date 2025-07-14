import React, { useEffect, useState } from "react";
import "./CountDownExamDay.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import lichthi from "../../assets/lich-thi-thpt.png"


const CountDownExamDay = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [targetDate, setTargetDate] = useState(null);

    const fetchNgayThiTotNghiep = async () => {
        try {
            const response = await axios.get("/api/ngay-thi-tot-nghiep")
            setTargetDate(new Date(response.data));
            toast.success("fetch thanh cong")
        } catch (error) {
            console.log(error)
            toast.error("chưa có ngày thi tốt nghiệp")
        }

    }
    useEffect(() => {
        fetchNgayThiTotNghiep();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const currentYear = new Date().getFullYear();
 
    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <Navbar />
            <div className="countdown-detail-green-container">
                <div className="countdown-content-wrapper">
                    <h2 className="countdown-title">Đếm ngược ngày Thi tốt nghiệp THPT - {currentYear}  </h2>
                    <p className="countdown-subtitle">26 - 27/6/2025 (Thứ 5 - Thứ 6)</p>
                    <div className="countdown-box green">
                        <span className="label">Còn</span>
                        <span className="number">{timeLeft.days}</span>
                        <span className="label">ngày</span>
                    </div>

                    <div className="countdown-box-wrapper">
                        <div className="countdown-box-detail">
                            <div className="countdown-item">
                                <span>{timeLeft.days}</span>
                                <small>Ngày</small>
                            </div>
                            <div className="countdown-item">
                                <span>{timeLeft.hours}</span>
                                <small>Giờ</small>
                            </div>
                            <div className="countdown-item">
                                <span>{timeLeft.minutes}</span>
                                <small>Phút</small>
                            </div>
                            <div className="countdown-item">
                                <span>{timeLeft.seconds}</span>
                                <small>Giây</small>
                            </div>
                        </div>
                    </div>
                    <p className="countdown-description">
                        "Không có kỳ thi nào lớn hơn ước mơ của bạn. Hãy học hết mình hôm nay để tự hào ngày mai."
                    </p>
                    <p>
                        @360Book
                    </p>
                </div>

            </div>
            <div className="exam-info-wrapper">
                <h3 className="exam-info-title">Đếm ngược ngày Thi tốt nghiệp THPT - {currentYear}</h3>
                <p className="exam-info-text">
                    Theo thông tin chính thức từ Bộ Giáo dục và Đào tạo, kỳ thi tốt nghiệp THPT {currentYear} sẽ diễn ra trong 2 ngày: <strong>26/6 và 27/6/2025</strong> trên phạm vi toàn quốc.
                </p>
                <p className="exam-info-text">
                    Đây là kỳ thi quan trọng không chỉ để xét công nhận tốt nghiệp THPT mà còn là căn cứ để xét tuyển vào đại học, cao đẳng năm {currentYear}.
                </p>
                <p className="exam-info-text"><strong>Chi tiết lịch thi tốt nghiệp THPT - {currentYear}:</strong></p>
                <img src={lichthi} alt="Lịch thi tốt nghiệp THPT 2025" className="exam-schedule-image" />

                <p style={{ marginTop: "40px" }}>
                    <strong className="exam-info-title" style={{ color: "#2c3e50" }}> Những điều thí sinh cần lưu ý với khi đi thi tốt nghiệp THPT {currentYear}:</strong>
                </p>
                <p className="exam-info-text">
                    - Có mặt tại điểm thi trước ít nhất 30 phút so với giờ làm bài
                </p>
                <p className="exam-info-text">
                    - Mang theo <strong> CMND/CCCD, thẻ dự thi, bút, máy tính không có chức năng soạn thảo văn bản hoặc kết nối mạng</strong>
                </p>
                <p className="exam-info-text">
                    - Tuyệt đối không mang điện thoại hoặc các thiết bị công nghệ vào phòng thi
                </p>
                Lịch thi tốt nghiệp THPT - {currentYear} là cột mốc then chốt cho hành trình bước vào cánh cửa đại học. Chuẩn bị tốt – Vượt vũ môn thành công!

            </div >
            <Footer />
        </>
    );

};

export default CountDownExamDay;
