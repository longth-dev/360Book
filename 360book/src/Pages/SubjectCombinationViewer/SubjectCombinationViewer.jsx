import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
        axios.get("api/uni/v1/subject-combo")
            .then(res => {
                setSubjectCombinations(res.data.data || []);
            })
            .catch(err => {
                setError("Không thể tải danh sách tổ hợp môn. Vui lòng thử lại sau.");
                setSubjectCombinations([]);
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
        axios.get(`/api/uni/v1/by-combo?comboCode=${selectedCombo}`)
            .then(res => {
                const detailList = res.data.data.detailResponseList || [];
                const mapped = detailList.map(item => ({
                    ...item.university,
                    total: item.total
                }));
                setUniversities(mapped);
            })
            .catch(err => {
                setError("Không thể tải danh sách trường đại học. Vui lòng thử lại sau.");
                setUniversities([]);
            })
            .finally(() => setLoadingUniversities(false));
    }, [selectedCombo]);

    const selectedComboData = subjectCombinations.find(combo => combo.id === selectedCombo);

    return (
        <>
            <Navbar />
            <div className="subject-combination-viewer" style={{ background: '#fff', minHeight: '100vh' }}>
                <div className="subject-combination-container">
                    <div className="subject-combination-header">
                        <h2>Tra cứu tổ hợp môn xét tuyển</h2>
                        {/* <p>Chọn tổ hợp môn để xem danh sách các trường đại học xét tuyển</p> */}
                    </div>
                    {/* XÓA PHẦN CHỌN TỔ HỢP MÔN */}
                    {/* <div className="subject-selector-wrapper">
                        <div className="subject-selector-label">
                            Chọn tổ hợp môn xét tuyển
                        </div>
                        <select
                            className="subject-selector"
                            value={selectedCombo}
                            onChange={e => setSelectedCombo(e.target.value)}
                            disabled={loadingCombos}
                        >
                            <option value="">-- Chọn tổ hợp môn --</option>
                            {subjectCombinations.map((combo) => (
                                <option key={combo.codeCombination} value={combo.codeCombination}>
                                    {combo.codeCombination} - {combo.subjectName.join(", ")}
                                </option>

                            ))}
                        </select>
                        {loadingCombos && (
                            <div className="text-center mt-2">
                                <small className="text-muted">Đang tải danh sách tổ hợp môn...</small>
                            </div>
                        )}
                    </div> */}
                    {error && (
                        <div className="alert alert-warning" role="alert">
                            <strong>Lưu ý:</strong> {error}
                        </div>
                    )}
                    {/* Giữ lại phần hiển thị kết quả nếu có selectedCombo, hoặc empty-state nếu không có */}
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
                                                <tr key={uni.universityId}>
                                                    <td>{index + 1}</td>
                                                    <td className="university-name">{uni.universityName}</td>
                                                    <td>{uni.code}</td>
                                                    <td className="majors-list">
                                                        {Array.isArray(uni.majors)
                                                            ? uni.majors.join(", ")
                                                            : uni.majors || 'Chưa cập nhật'}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/danh-sach-truong/${uni.universityId}`}
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





