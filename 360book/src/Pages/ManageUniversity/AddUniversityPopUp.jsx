import React, { useState } from "react";
import "./AddUniversityPopUp.css";

const AddUniversityPopUp = ({ onClose, onSubmit }) => {
    const [form, setForm] = useState({
        tenTruong: "",
        maTruong: "",
        diaChi: "",
        theManh: "",
        thumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, thumbnail: file }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content p-4 bg-white rounded shadow">
                <h5 className="mb-3 text-center">🎓 Thêm Trường Đại Học</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label><i className="fas fa-university me-2"></i>Tên trường</label>
                        <input
                            type="text"
                            className="form-control"
                            name="tenTruong"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label><i className="fas fa-code me-2"></i>Mã trường</label>
                        <input
                            type="text"
                            className="form-control"
                            name="maTruong"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label><i className="fas fa-map-marker-alt me-2"></i>Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            name="diaChi"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label><i className="fas fa-star me-2"></i>Thế mạnh</label>
                        <input
                            type="text"
                            className="form-control"
                            name="theManh"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label><i className="fas fa-image me-2"></i>Hình ảnh (tùy chọn)</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {/* Hiển thị preview nếu có ảnh */}
                        {form.thumbnail && (
                            <div className="mt-2 text-center">
                                <img
                                    src={URL.createObjectURL(form.thumbnail)}
                                    alt="preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: "200px", borderRadius: "8px" }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Tạo mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUniversityPopUp;
