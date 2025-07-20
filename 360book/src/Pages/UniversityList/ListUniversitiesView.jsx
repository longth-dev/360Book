import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./ListUniversitiesView.css";

const UniversityList = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://your-api/universities")
            .then((res) => {
                setUniversities(res.data);
                toast.success("Tải lên danh sách thành công");
                setLoading(false);
            })
            .catch((err) => {
                setUniversities([]);
                toast.error("Tải lên danh sách thất bại");
                setLoading(true); // loader vẫn hiển thị khi lỗi
                console.error(err);
            });
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <Navbar />
            <div className="university-list-container">
                <h2 className="university-list-title">Danh sách trường đại học</h2>
                {loading ? (
                    <div className="row">
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    </div>
                ) : (
                    <div className="university-list-grid">
                        {universities.map((uni) => (
                            <div key={uni.id} className="university-list-card">
                                <img src={uni.thumbnail} alt={uni.name} className="university-list-thumbnail" />
                                <h3 className="university-list-name">{uni.name}</h3>
                                <Link to={`/universities/${uni.id}`} className="university-list-detail-link">Xem chi tiết</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UniversityList; 