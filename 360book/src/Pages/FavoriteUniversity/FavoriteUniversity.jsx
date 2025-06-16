import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import './FavoriteUniversity.css'
import { useNavigate } from "react-router-dom";

const FavoriteUniversity = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [searchTerm, setSearchTerm] = useState("");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchFavorites = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get(`/api/truong-yeu-thich/${userId}`);
    //             setFavorites(response.data.data || []);
    //             toast.success("Tải danh sách trường yêu thích thành công");
    //         } catch (error) {
    //             console.error("Lỗi khi tải danh sách trường yêu thích:", error);
    //             toast.error("Tải danh sách trường yêu thích thất bại");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (userId) {
    //         fetchFavorites();
    //     } else {
    //         setLoading(false);
    //         toast.error("Bạn chưa đăng nhập");
    //     }
    // }, [userId]);


    useEffect(() => {
        const mockFavorites = [
            {
                id: 1,
                tenTruong: "Đại học Bách Khoa Hà Nội",
                maTruong: "BKHN",
                diaChi: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
                theManh: "Top kỹ thuật Việt Nam",
                thumbnail: "https://picsum.photos/200/150?random=1"
            },
            {
                id: 2,
                tenTruong: "Đại học Kinh tế Quốc dân",
                maTruong: "KTQD",
                diaChi: "207 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội",
                theManh: "Top kinh tế hàng đầu",
                thumbnail: "https://picsum.photos/200/150?random=2"
            },
            {
                id: 3,
                tenTruong: "Đại học Quốc gia Hà Nội",
                maTruong: "QGHN",
                diaChi: "144 Xuân Thủy, Cầu Giấy, Hà Nội",
                theManh: "Đa ngành, đa lĩnh vực",
                thumbnail: "https://picsum.photos/200/150?random=3"
            },
            {
                id: 4,
                tenTruong: "Đại học FPT",
                maTruong: "FPTU",
                diaChi: "FPT City, Hoà Lạc, Hà Nội",
                theManh: "Công nghệ thông tin, đào tạo quốc tế",
                thumbnail: "https://picsum.photos/200/150?random=4"
            },
            {
                id: 5,
                tenTruong: "Đại học Y Hà Nội",
                maTruong: "YHN",
                diaChi: "01 Tôn Thất Tùng, Đống Đa, Hà Nội",
                theManh: "Y khoa hàng đầu Việt Nam",
                thumbnail: "https://picsum.photos/200/150?random=5"
            },
            {
                id: 6,
                tenTruong: "Đại học Sư phạm Hà Nội",
                maTruong: "SPHN",
                diaChi: "136 Xã Đàn, Đống Đa, Hà Nội",
                theManh: "Đào tạo giáo viên chất lượng cao",
                thumbnail: "https://picsum.photos/200/150?random=6"
            },
            {
                id: 7,
                tenTruong: "Đại học Sư phạm Hà Nội",
                maTruong: "SPHN",
                diaChi: "136 Xã Đàn, Đống Đa, Hà Nội",
                theManh: "Đào tạo giáo viên chất lượng cao",
                thumbnail: "https://picsum.photos/200/150?random=6"
            }
        ];
        setTimeout(() => {
            setFavorites(mockFavorites);
            setLoading(false);
        }, 1000);
    }, []);



    const filteredFavorites = favorites.filter(university =>
        university.tenTruong.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);


    const currentItems = filteredFavorites.slice(
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


    const handleCardClick = (id) => {
        navigate(`/truong-dai-hoc/${id}`);
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <ToastContainer position="top-right" autoClose={5000} />
            <Navbar />

            <main className="flex-grow-1 container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold fs-3 mb-0">
                        🎓 Danh sách trường yêu thích
                    </h1>
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: '320px' }}
                        placeholder="🔍 Tìm kiếm theo tên hoặc mã trường..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : filteredFavorites.length === 0 ? (
                    <p className="text-center text-secondary">Không tìm thấy trường phù hợp.</p>
                ) : (
                    <>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {currentItems.map(university => (
                                <div
                                    key={university.id}
                                    className="col"
                                >
                                    <div
                                        className="card h-100 shadow-sm rounded-4 card-hover"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleCardClick(university.id)}
                                    >
                                        <img
                                            src={university.thumbnail || "https://picsum.photos/200/150"}
                                            className="card-img-top rounded-top-4"
                                            alt={university.tenTruong}
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{university.tenTruong} - {university.maTruong}</h5>
                                            <p className="card-text text-muted">📍 {university.diaChi}</p>
                                            {university.theManh && <p className="card-text text-muted">⚡ {university.theManh}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

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
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default FavoriteUniversity;
