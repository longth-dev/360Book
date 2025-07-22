import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import "./ManageMajorGroup.css";

const ManageMajorGroup = () => {
    const [subjectCombinations, setSubjectCombinations] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [editingCombo, setEditingCombo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [formData, setFormData] = useState({
        id: "",
        codeCombination: "",
        subjectNames: [],
    });

    const fetchAllSubjects = async () => {
        try {
            const response = await axios.get("/api/uni/v1/subject");
            const data = response.data.data || [];

            const options = data.map(item => ({
                value: item.subjectName,
                label: item.subjectName
            }));

            setSubjectOptions(options);
        } catch (error) {
            console.error("Lỗi khi fetch môn học:", error);
            toast.error("Tải danh sách môn học thất bại");
        }
    };

    const fetchSubjectCombinations = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/uni/v1/subject-combo");
            const combos = (response.data.data || []).map(item => ({
                id: item.codeCombination,
                codeCombination: item.codeCombination,
                totalMajor: item.totalMajor,
                subjectNames: item.subjectName,
            }));
            setSubjectCombinations(combos);
            toast.success("Tải danh sách tổ hợp môn thành công");
        } catch (error) {
            console.error(error);
            toast.error("Tải danh sách tổ hợp môn thất bại");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjectCombinations();
        fetchAllSubjects();
    }, []);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectsChange = selected =>
        setFormData(prev => ({
            ...prev,
            subjectNames: selected ? selected.map(option => option.value) : [],
        }));

    const resetForm = () =>
        setFormData({ id: "", codeCombination: "", subjectNames: [] });

    const handleAddClick = () => {
        resetForm();
        setShowModal(true);
    };

    const handleEditClick = combo => {
        setEditingCombo(combo);
        setFormData({
            id: combo.id,
            codeCombination: combo.codeCombination,
            subjectNames: combo.subjectNames, // nhớ đổi cả key này nếu cần
        });
        setShowUpdateModal(true);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!formData.codeCombination || formData.subjectNames.length === 0) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        try {
            if (editingCombo) {
                await axios.put(`/api/tohopmon/${formData.id}`, formData);
                toast.success("Cập nhật thành công!");
            } else {
                await axios.post("/api/uni/v1/subject-combo", formData);
                toast.success("Thêm thành công!");
            }
            fetchSubjectCombinations();
            setShowModal(false);
            setShowUpdateModal(false);
            resetForm();
            setEditingCombo(null);
        } catch (error) {
            toast.error("Thao tác thất bại!");
        }
    };

    const handleDelete = async id => {
        if (!window.confirm("Xác nhận xóa?")) return;
        try {
            await axios.delete(`/api/tohopmon/${id}`);
            toast.success("Xóa thành công!");
            fetchSubjectCombinations();
        } catch {
            toast.error("Xóa thất bại!");
        }
    };

    const filtered = subjectCombinations.filter(c =>
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const currentItems = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="manage-major-group container">
            <ToastContainer />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>🎓 Quản lý Tổ hợp môn</h1>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: '400px' }}
                        placeholder="Tìm kiếm mã tổ hợp..."
                        value={searchTerm}
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="buttons mb-2">
                    <button className="btn" onClick={handleAddClick}>
                        <span></span>
                        <p data-start="good luck!" data-text="start!" data-title="Thêm"></p>
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center">Mã</th>
                            <th className="text-center">Môn</th>
                            <th className="text-center">Số lượng ngành</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(c => (
                            <tr key={c.id}>
                                <td className="text-center">{c.id}</td>
                                <td className="text-center">{c.subjectNames.join(", ")}</td>
                                <td className="text-center">{c.totalMajor}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => handleEditClick(c)}
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    Không có kết quả
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        disabled={currentPage === 1}
                        className="btn btn-secondary"
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        ← Trước
                    </button>
                    <span>
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        className="btn btn-secondary"
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Sau →
                    </button>
                </div>
            )}
            {/* Modal */}
            {(showModal || showUpdateModal) && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {editingCombo ? "Cập nhật" : "Thêm"} tổ hợp môn
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => {
                                            setShowModal(false);
                                            setShowUpdateModal(false);
                                            resetForm();
                                            setEditingCombo(null);
                                        }}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Mã</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="codeCombination"
                                            value={formData.codeCombination}
                                            onChange={handleInputChange}
                                            disabled={editingCombo}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Môn</label>
                                        <Select
                                            isMulti
                                            options={subjectOptions}
                                            value={subjectOptions.filter(opt =>
                                                (formData.subjectNames || []).includes(opt.value)
                                            )}
                                            onChange={handleSubjectsChange}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowModal(false);
                                            setShowUpdateModal(false);
                                            resetForm();
                                            setEditingCombo(null);
                                        }}
                                    >
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingCombo ? "Cập nhật" : "Thêm"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMajorGroup;
