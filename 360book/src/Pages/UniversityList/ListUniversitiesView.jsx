import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./ListUniversitiesView.css";

const ListUniversitiesView = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        axios.get("/api/uni/v1")
            .then((res) => {
                setUniversities(res.data.data);
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

    const listUniversity = universities.filter(university =>
        university.universityName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(listUniversity.length / itemsPerPage);


    const currentItems = listUniversity.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };



    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <Navbar />
            <div className="university-list-container">
                <h2 className="university-list-title">Danh sách trường đại học</h2>
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: '320px' }}
                    placeholder="🔍 Tìm kiếm theo tên hoặc mã trường..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {loading ? (
                    <div className="row">
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    </div>
                ) : (
                    <div className="university-list-grid">
                        {currentItems.map((uni) => (
                            <div key={uni.universityId} className="university-list-card">
                                <img src={uni.thumbnail} alt={uni.universityName} className="university-list-thumbnail" />
                                <h3 className="university-list-name">{uni.universityName}</h3>
                                <Link to={`/danh-sach-truong/${uni.universityId}`} className="university-list-detail-link">Xem chi tiết</Link>
                            </div>
                        ))}
                    </div>
                )}
                {/* Pagination */}
                <nav className="mt-4 d-flex justify-content-center">
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <li key={idx + 1} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(idx + 1)}>{idx + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <Footer />
        </>
    );
};

export default ListUniversitiesView; 