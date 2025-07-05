import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./SubjectCombinationViewer.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export default function SubjectCombinationViewer() {
    const [selectedCombo, setSelectedCombo] = useState("");
    const [subjectCombinations, setSubjectCombinations] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUniversities, setLoadingUniversities] = useState(false);
    const [error, setError] = useState(null);

    // Fetch danh sách tổ hợp môn
    const fetchSubjectCombinations = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("/api/tohopmon");
            setSubjectCombinations(response.data.data || []);
            toast.success("Tải danh sách tổ hợp môn thành công");
        } catch (error) {
            console.error("Lỗi khi tải danh sách tổ hợp môn:", error);
            setError("Không thể tải danh sách tổ hợp môn. Vui lòng thử lại sau.");
            toast.error("Tải danh sách tổ hợp môn thất bại");
            setSubjectCombinations([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch danh sách trường đại học theo tổ hợp môn
    const fetchUniversitiesByCombo = async (comboId) => {
        if (!comboId) {
            setUniversities([]);
            return;
        }

        try {
            setLoadingUniversities(true);
            setError(null);
            const response = await axios.get(`/api/universities?toHopMon=${comboId}`);
            setUniversities(response.data.data || []);
            toast.success(`Tải danh sách trường cho tổ hợp ${comboId} thành công`);
        } catch (error) {
            console.error("Lỗi khi tải danh sách trường:", error);
            setError("Không thể tải danh sách trường đại học. Vui lòng thử lại sau.");
            toast.error("Tải danh sách trường thất bại");
            setUniversities([]);
        } finally {
            setLoadingUniversities(false);
        }
    };

    // Load danh sách tổ hợp môn khi component mount
    useEffect(() => {
        fetchSubjectCombinations();
    }, []);

    // Fetch trường đại học khi chọn tổ hợp môn
    useEffect(() => {
        if (selectedCombo) {
            fetchUniversitiesByCombo(selectedCombo);
        } else {
            setUniversities([]);
        }
    }, [selectedCombo]);

    const handleComboChange = (e) => {
        setSelectedCombo(e.target.value);
    };

    const selectedComboData = subjectCombinations.find(combo => combo.id === selectedCombo);
    const universityCount = universities.length;

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="subject-combination-viewer">
                <div className="subject-combination-container">
                    <div className="subject-combination-header">
                        <h2>Tra cứu tổ hợp môn xét tuyển</h2>
                        <p>Chọn tổ hợp môn để xem danh sách các trường đại học xét tuyển</p>
                    </div>

                    <div className="subject-selector-wrapper">
                        <div className="subject-selector-label">
                            Chọn tổ hợp môn xét tuyển
                        </div>
                        <select
                            className="subject-selector"
                            value={selectedCombo}
                            onChange={handleComboChange}
                            disabled={loading}
                        >
                            <option value="">-- Chọn tổ hợp môn --</option>
                            {subjectCombinations.map((combo) => (
                                <option key={combo.id} value={combo.id}>
                                    {combo.id} - {combo.name}
                                </option>
                            ))}
                        </select>
                        {loading && (
                            <div className="text-center mt-2">
                                <small className="text-muted">Đang tải danh sách tổ hợp môn...</small>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="alert alert-warning" role="alert">
                            <strong>Lưu ý:</strong> {error}
                        </div>
                    )}

                    {selectedCombo ? (
                        <div className="results-section">
                            <div className="results-header">
                                <div>
                                    <h3 className="results-title">
                                        Kết quả tra cứu tổ hợp môn {selectedCombo}
                                        {selectedComboData && ` - ${selectedComboData.name}`}
                                    </h3>
                                    <div className="results-count">
                                        {loadingUniversities ? 'Đang tải...' : `${universityCount} trường đại học`}
                                    </div>
                                </div>
                                <Link
                                    to={`/universities/${selectedCombo}`}
                                    className="view-all-btn"
                                >
                                    Xem tất cả trường
                                </Link>
                            </div>

                            {loadingUniversities ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Đang tải...</span>
                                    </div>
                                    <p className="mt-2 text-muted">Đang tải danh sách trường đại học...</p>
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
                                                    <td className="majors-list">{uni.maTruong}</td>
                                                    <td className="majors-list">
                                                        {Array.isArray(uni.majors)
                                                            ? uni.majors.join(", ")
                                                            : uni.majors || 'Chưa cập nhật'
                                                        }
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


