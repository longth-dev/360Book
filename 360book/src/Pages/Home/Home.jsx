import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import bg from "../../assets/bg.png";
import Footer from "../../Components/Footer/Footer";
import './Home.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {
    const navigate = useNavigate();
    const [PTTS, setPTTS] = useState([]);
    const [THM, setTHM] = useState([]);
    const [diemChuan, setDiemChuan] = useState([]);
    const [theManh, setTheManh] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (btnName) => {
        setActiveButton(btnName);
    };


    const handleClickTaiDay = () => {
        navigate("/tu-van-chon-truong")
    }

    const fetchPTTS = async () => {
        try {
            const response = await axios.get("/api/get-ptts");
            setPTTS(response.data.data);
            setActiveData(response.data.data);
            toast.success("fetch success PTTS");
        } catch (error) {
            console.log(error);
            toast.error("fail fetch");
        }
    }
    const fetchTHM = async () => {
        try {
            const response = await axios.get("/api/get-thm");
            setTHM(response.data.data);
            setActiveData(response.data.data);
            toast.success("fetch success THM");
        } catch (error) {
            console.log(error);
            toast.error("fail fetch");
        }
    }
    const fetchDiemChuan = async () => {
        try {
            const response = await axios.get("/api/diem-chuan");
            setDiemChuan(response.data.data);
            setActiveData(response.data.data);
            toast.success("fetch success Diem Chuan");
        } catch (error) {
            console.log(error);
            toast.error("fail fetch");
        }
    }


    const fetchTheManh = async () => {
        try {
            const response = await axios.get("/api/the-manh");
            setTheManh(response.data.data)
            setActiveData(response.data.data)
            toast.success("fetch thanh cong the manh")
        } catch (error) {
            console.log(error)
            toast.error("fail lay len the manh")
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <Navbar />
            <div>
                <div
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        textAlign: "center",
                        padding: "0 20px",
                    }}
                >
                    <h1 className="mb-4" style={{ marginTop: "-100px" }}>Chào mừng bạn đến với 360 BOOK !</h1>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-3" style={{ marginRight: "483px" }}>
                        <button
                            onClick={() => { handleClick('PTTS'); fetchPTTS(); }}
                            className={`home-button btn btn-outline-light px-4 py-2 fw-semibold hover-yellow ${activeButton === 'PTTS' ? 'active' : ''}`}
                            style={{ borderRadius: "5px", color: "grey", backgroundColor: "white" }}
                        >
                            Phương thức tuyển sinh
                        </button>

                        <button
                            onClick={() => { handleClick('THM'); fetchTHM(); }}
                            className={`home-button btn btn-outline-light px-4 py-2 fw-semibold hover-yellow ${activeButton === 'THM' ? 'active' : ''}`}
                            style={{ borderRadius: "5px", color: "grey", backgroundColor: "white" }}
                        >
                            Khối - tổ hợp môn
                        </button>

                        <button
                            onClick={() => { handleClick('DiemChuan'); fetchDiemChuan(); }}
                            className={`home-button btn btn-outline-light px-4 py-2 fw-semibold hover-yellow ${activeButton === 'DiemChuan' ? 'active' : ''}`}
                            style={{ borderRadius: "5px", color: "grey", backgroundColor: "white" }}
                        >
                            Điểm chuẩn
                        </button>
                        <button
                            onClick={() => { handleClick('ThemManh'); fetchTheManh(); }}
                            className={`home-button btn btn-outline-light px-4 py-2 fw-semibold hover-yellow ${activeButton === 'TheManh' ? 'active' : ''}`}
                            style={{ borderRadius: "5px", color: "grey", backgroundColor: "white" }}
                        >
                            Thế mạnh
                        </button>
                    </div>
                    <div className="search-container" style={{ position: "relative", width: "100%", maxWidth: "1200px", marginTop: "-5px" }}>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Tìm kiếm trường, ngành, điểm chuẩn..."
                            style={{ borderRadius: "5px", paddingLeft: "25px", fontSize: "1.2rem", cursor: "pointer", }}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}

                        />
                        {isInputFocused && showDropdown && activeData.length > 0 && (
                            <div
                                className="dropdown-menu show"
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    width: "100%",
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    marginTop: "8px",
                                    cursor: "pointer",
                                    zIndex: 10
                                }}
                            >
                                {activeData.map((item, index) => (
                                    <div key={index} className="dropdown-item">
                                        <strong>ID:</strong> {item.id || item.ID} - <strong>Name:</strong> {item.tenPhuongThuc || item.tenKhoi || item.tenNganh || item.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: "20px", marginBottom: "5px" }}>
                        <p style={{
                            color: "#000",
                            fontSize: "1.25rem",
                            fontWeight: "500",
                            textAlign: "center",
                            maxWidth: "800px"
                        }}>
                            Bạn đang muốn tìm xem với điểm số của mình theo từng phương thức xét tuyển<br />
                            thì trường nào, ngành nào phù hợp?
                        </p>
                    </div>
                    <div>
                        <button onClick={handleClickTaiDay}
                            style={{
                                background: "none",
                                borderRadius: "4px",
                                color: "black",
                                cursor: "pointer",
                                fontSize: "1rem",
                                padding: "4px 12px",
                                border: "1.5px solid",
                            }}
                        >
                            <span>Tại đây</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;