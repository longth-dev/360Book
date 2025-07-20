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
    const [showModal, setShowModal] = useState(false);
    const [newMaNganh, setNewMaNganh] = useState("");
    const [newTenNganh, setNewTenNganh] = useState("");


    const fetchNganhHoc = async () => {
        try {
            const response = await axios.get(`/api/uni/v1/major`);
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
            if (!newTenNganh) {
                toast.error("Vui lòng nhập đầy đủ thông tin mã ngành và tên ngành");
                return;
            }
            console.log({
                majorName: newTenNganh
            });
            const response = await axios.post(`/api/uni/major`, {
                name: newTenNganh,
            });

            if (response.data.code === 200) {
                toast.success("Thêm ngành học thành công");
                setMajorList(prev => [
                    ...prev,
                    { majorName: newTenNganh }
                ]);
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
                <span>📘Quản lý Ngành Học</span>
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
                            <th>Tên ngành</th>

                        </tr>
                    </thead>
                    <tbody>
                        {majorList.map((major, index) => (
                            <tr key={major.majorName}>
                                <td>{index + 1}</td>
                                <td>{major.majorName}</td>
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
        </div>
    );
};

export default ManageMajorDetail;


