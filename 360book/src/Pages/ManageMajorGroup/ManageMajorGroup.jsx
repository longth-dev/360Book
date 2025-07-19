import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./ManageMajorGroup.css";

const ManageMajorGroup = () => {
    const [subjectCombinations, setSubjectCombinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [editingCombo, setEditingCombo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Form state
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        subjects: []
    });

    // Available subjects for selection
    const availableSubjects = [
        "Toán", "Lý", "Hóa", "Sinh", "Văn", "Sử", "Địa", "Anh", "GDCD"
    ];

    // Fetch danh sách tổ hợp môn
    const fetchSubjectCombinations = async () => {
        try {
            setLoading(true); // Đảm bảo loader hiển thị khi bắt đầu fetch
            const response = await axios.get("/api/tohopmon");
            setSubjectCombinations(response.data.data || []);
            toast.success("Tải danh sách tổ hợp môn thành công");
            setLoading(false); // Loader ẩn khi fetch thành công
        } catch (error) {
            console.error("Lỗi khi tải danh sách tổ hợp môn:", error);
            toast.error("Tải danh sách tổ hợp môn thất bại");
            setLoading(true); // Loader vẫn hiển thị khi fetch thất bại
        }
    };

    useEffect(() => {
        setLoading(true); // Đảm bảo loader hiển thị khi bắt đầu fetch
        fetchSubjectCombinations();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle subject selection
    const handleSubjectToggle = (subject) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            subjects: []
        });
    };

    // Open add modal
    const handleAddClick = () => {
        resetForm();
        setShowModal(true);
    };

    // Open update modal
    const handleEditClick = (combo) => {
        setEditingCombo(combo);
        setFormData({
            id: combo.id,
            name: combo.name,
            subjects: combo.subjects || []
        });
        setShowUpdateModal(true);
    };

    // Handle add new combination
    const handleAddCombination = async (e) => {
        e.preventDefault();

        if (!formData.id || !formData.name || formData.subjects.length === 0) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            await axios.post("/api/tohopmon", formData);
            toast.success("Thêm tổ hợp môn thành công!");
            setShowModal(false);
            resetForm();
            fetchSubjectCombinations();
        } catch (error) {
            console.error("Lỗi khi thêm tổ hợp môn:", error);
            toast.error("Thêm tổ hợp môn thất bại!");
        }
    };

    // Handle update combination
    const handleUpdateCombination = async (e) => {
        e.preventDefault();

        if (!formData.name || formData.subjects.length === 0) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            await axios.put(`/api/tohopmon/${formData.id}`, formData);
            toast.success("Cập nhật tổ hợp môn thành công!");
            setShowUpdateModal(false);
            resetForm();
            setEditingCombo(null);
            fetchSubjectCombinations();
        } catch (error) {
            console.error("Lỗi khi cập nhật tổ hợp môn:", error);
            toast.error("Cập nhật tổ hợp môn thất bại!");
        }
    };

    // Handle delete combination
    const handleDeleteCombination = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tổ hợp môn này?")) {
            try {
                await axios.delete(`/api/tohopmon/${id}`);
                toast.success("Xóa tổ hợp môn thành công!");
                fetchSubjectCombinations();
            } catch (error) {
                console.error("Lỗi khi xóa tổ hợp môn:", error);
                toast.error("Xóa tổ hợp môn thất bại!");
            }
        }
    };

    // Filter and pagination
    const filteredCombinations = subjectCombinations.filter(combo =>
        combo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        combo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCombinations.length / itemsPerPage);
    const currentItems = filteredCombinations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="manage-major-group">
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="manage-major-group-header">
                <h1>🎓 Quản lý Tổ hợp môn</h1>
                <p>Thêm, sửa, xóa các tổ hợp môn xét tuyển đại học</p>
            </div>

            <div className="manage-major-group-controls">
                <div className="search-section">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="🔍 Tìm kiếm theo mã hoặc tên tổ hợp môn..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="action-section">
                    <button className="add-btn" onClick={handleAddClick}>
                        <span>+</span>
                        Thêm tổ hợp môn
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className="combinations-grid">
                    {currentItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📚</div>
                            <h3>Không có dữ liệu</h3>
                            <p>Chưa có tổ hợp môn nào được tạo</p>
                        </div>
                    ) : (
                        currentItems.map((combo) => (
                            <div key={combo.id} className="combination-card">
                                <div className="combination-header">
                                    <h3 className="combination-id">{combo.id}</h3>
                                    <div className="combination-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditClick(combo)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteCombination(combo.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <div className="combination-content">
                                    <h4 className="combination-name">{combo.name}</h4>
                                    <div className="subjects-list">
                                        {combo.subjects && combo.subjects.map((subject, index) => (
                                            <span key={index} className="subject-tag">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ← Trước
                    </button>
                    <span className="page-info">
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Sau →
                    </button>
                </div>
            )}

            {/* Add Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="manage-major-group-modal-content">
                        <div className="modal-header">
                            <h2>Thêm tổ hợp môn mới</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleAddCombination} className="modal-form">
                            <div className="form-group">
                                <label>Mã tổ hợp môn:</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleInputChange}
                                    placeholder="VD: A00, D01..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Tên tổ hợp môn:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="VD: Toán - Lý - Hóa"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Chọn các môn học:</label>
                                <div className="subjects-grid">
                                    {availableSubjects.map(subject => (
                                        <label key={subject} className="subject-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={formData.subjects.includes(subject)}
                                                onChange={() => handleSubjectToggle(subject)}
                                            />
                                            <span>{subject}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="submit-btn">
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="modal-overlay">
                    <div className="manage-major-group-modal-content">
                        <div className="modal-header">
                            <h2>Cập nhật tổ hợp môn</h2>
                            <button className="close-btn" onClick={() => setShowUpdateModal(false)}>
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleUpdateCombination} className="modal-form">
                            <div className="form-group">
                                <label>Mã tổ hợp môn:</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    disabled
                                    className="disabled-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Tên tổ hợp môn:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="VD: Toán - Lý - Hóa"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Chọn các môn học:</label>
                                <div className="subjects-grid">
                                    {availableSubjects.map(subject => (
                                        <label key={subject} className="subject-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={formData.subjects.includes(subject)}
                                                onChange={() => handleSubjectToggle(subject)}
                                            />
                                            <span>{subject}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="submit-btn">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMajorGroup;
