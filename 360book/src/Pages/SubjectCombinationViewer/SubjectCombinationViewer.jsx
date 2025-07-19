import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./SubjectCombinationViewer.css";

export default function SubjectCombinationViewer() {
    const [selectedCombo, setSelectedCombo] = useState("");
    const [subjectCombinations, setSubjectCombinations] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [loadingCombos, setLoadingCombos] = useState(false);
    const [loadingUniversities, setLoadingUniversities] = useState(false);
    const [error, setError] = useState(null);

    // Fetch danh sách tổ hợp môn
    useEffect(() => {
        setLoadingCombos(true);
        setError(null);
        axios.get("https://your-api/subject-combinations")
            .then(res => {
                setSubjectCombinations(res.data.data || []);
                toast.success("Tải danh sách tổ hợp môn thành công");
            })
            .catch(err => {
                setError("Không thể tải danh sách tổ hợp môn. Vui lòng thử lại sau.");
                setSubjectCombinations([]);
                toast.error("Tải danh sách tổ hợp môn thất bại");
            })
            .finally(() => setLoadingCombos(false));
    }, []);

    // Fetch danh sách trường đại học theo tổ hợp môn
    useEffect(() => {
        if (!selectedCombo) {
            setUniversities([]);
            return;
        }
        setLoadingUniversities(true);
        setError(null);
        axios.get(`https://your-api/universities?combo=${selectedCombo}`)
            .then(res => {
                setUniversities(res.data.data || []);
                toast.success(`Tải danh sách trường cho tổ hợp ${selectedCombo} thành công`);
            })
            .catch(err => {
                setError("Không thể tải danh sách trường đại học. Vui lòng thử lại sau.");
                setUniversities([]);
                toast.error("Tải danh sách trường thất bại");
            })
            .finally(() => setLoadingUniversities(false));
    }, [selectedCombo]);

    const selectedComboData = subjectCombinations.find(combo => combo.id === selectedCombo);

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="subject-combination-viewer" style={{ background: '#fff', minHeight: '100vh' }}>
                <div className="subject-combination-container">
                    <div className="subject-combination-header">
                        <h2>Tra cứu tổ hợp môn xét tuyển</h2>
                        <p>Chọn tổ hợp môn để xem danh sách các trường đại học xét tuyển</p>
                    </div>
                    <div className="subject-selector-wrapper">
                        <div className="subject-selector-label">
                            Chọn tổ hợp môn xét tuyển
                        </div>
                        {loadingCombos ? (
                            <div className="loader-container" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <select
                                className="subject-selector"
                                value={selectedCombo}
                                onChange={e => setSelectedCombo(e.target.value)}
                                disabled={loadingCombos}
                            >
                                <option value="">-- Chọn tổ hợp môn --</option>
                                {subjectCombinations.map((combo) => (
                                    <option key={combo.id} value={combo.id}>
                                        {combo.id} - {combo.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    {/* Xóa dòng lưu ý khi có lỗi */}
                    {selectedCombo ? (
                        <div className="results-section">
                            <div className="results-header">
                                <div>
                                    <h3 className="results-title">
                                        Kết quả tra cứu tổ hợp môn {selectedCombo}
                                        {selectedComboData && ` - ${selectedComboData.name}`}
                                    </h3>
                                    <div className="results-count">
                                        {loadingUniversities ? 'Đang tải...' : `${universities.length} trường đại học`}
                                    </div>
                                </div>
                            </div>
                            {loadingUniversities ? (
                                <div className="loader-container" style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="loader"></div>
                                </div>
                            ) : universities.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="universities-table">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên trường</th>
                                                <th>Mã trường</th>
                                                <th>Ngành xét tuyển</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {universities.map((uni, index) => (
                                                <tr key={uni.id}>
                                                    <td>{index + 1}</td>
                                                    <td className="university-name">{uni.tenTruong}</td>
                                                    <td>{uni.maTruong}</td>
                                                    <td className="majors-list">
                                                        {Array.isArray(uni.majors)
                                                            ? uni.majors.join(", ")
                                                            : uni.majors || 'Chưa cập nhật'}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/university-detail/${selectedCombo}/${uni.id}`}
                                                            className="detail-btn"
                                                        >
                                                            Xem chi tiết
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-state-icon">🏫</div>
                                    <div className="empty-state-text">Không có trường nào</div>
                                    <div className="empty-state-subtext">
                                        Chưa có trường đại học nào xét tuyển tổ hợp môn này
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">📚</div>
                            <div className="empty-state-text">Chưa có dữ liệu</div>
                            <div className="empty-state-subtext">
                                Vui lòng chọn tổ hợp môn để xem kết quả tra cứu
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
} 