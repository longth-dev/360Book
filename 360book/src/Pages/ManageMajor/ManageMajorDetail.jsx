import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './ManageMajorDetail.css'
import { toast, ToastContainer } from "react-toastify";

const ManageMajorDetail = () => {
    const { id } = useParams();
    const [majorList, setMajorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const tenTruong = location.state?.tenTruong || "Đại Học Học Đại";
    const maTruong = location.state?.maTruong || "Mã Trường";
    const [showModal, setShowModal] = useState(false);
    const [newMaNganh, setNewMaNganh] = useState("");
    const [newTenNganh, setNewTenNganh] = useState("");
    const navigate = useNavigate();


    const fetchNganhHoc = async () => {
        try {
            const response = await axios.get(`/api/chi-tiet-nganh-hoc/${id}`);
            setMajorList(response.data.data);
            toast.success("Tải danh sách ngành học thành công");
        } catch (error) {
            toast.error("Tải danh sách ngành học thất bại");
            console.error("Lỗi khi tải chi tiết ngành học:", error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNganhHoc();
    }, [id]);


    const handleAddMajor = async () => {
        try {
            if (!newMaNganh || !newTenNganh) {
                toast.error("Vui lòng nhập đầy đủ thông tin mã ngành và tên ngành");
                return;
            }

            const response = await axios.post(`/api/them-nganh-hoc/${id}`, {
                maNganh: newMaNganh,
                tenNganh: newTenNganh
            });

            if (response.data.success) {
                toast.success("Thêm ngành học thành công");
                setMajorList(prev => [...prev, { maNganh: newMaNganh, tenNganh: newTenNganh }]);
                setNewMaNganh("");
                setNewTenNganh("");
                setShowModal(false);
            } else {
                toast.error("Thêm ngành học thất bại");
            }
        }
        catch (error) {
            console.error("Lỗi khi thêm ngành học:", error);
            toast.error("Thêm ngành học thất bại");
        }
    }

    return (



        <div className="manage-major-detail bg-light min-vh-100 p-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-center align-items-center mb-4 gap-2" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                <span>📘 Chi tiết Ngành Học tại</span>
                <span style={{ color: '#0d6efd' }}> - {tenTruong} ({maTruong})</span>
            </div>

            <div className="buttons mb-2 d-flex justify-content-end mb-3">
                <button className="btn" onClick={() => setShowModal(true)}>
                    <span></span>
                    <p data-start="good luck!" data-text="start!" data-title="Thêm Ngành"></p>
                </button>
            </div>


            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>STT</th>
                            <th>Mã ngành</th>
                            <th>Tên ngành</th>
                        </tr>
                    </thead>
                    <tbody>
                        {majorList.map((major, index) => (
                            <tr key={major.maNganh}>
                                <td>{index + 1}</td>
                                <td>{major.maNganh}</td>
                                <td>{major.tenNganh}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            )}


            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content p-4 bg-white rounded shadow">
                        <h5 className="mb-3 text-center">📘 Thêm Ngành Học</h5>
                        <div className="form-group mb-3">
                            <label><i className="fas fa-code me-2"></i>Mã Ngành</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newMaNganh}
                                onChange={(e) => setNewMaNganh(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label><i className="fas fa-book me-2"></i>Tên Ngành</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newTenNganh}
                                onChange={(e) => setNewTenNganh(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                            <button className="btn btn-primary" onClick={handleAddMajor}>Thêm</button>
                        </div>
                    </div>
                </div>
            )}


            <div className="text-center mt-4">
                <button className="btn btn-outline-secondary px-4 py-2" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left"></i> Go Back
                </button>
            </div>
        </div>
    );
};

export default ManageMajorDetail;


