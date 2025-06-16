import React, { useState, useEffect } from "react";

const UpdateUniversityPopUp = ({ university, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    tenTruong: "",
    maTruong: "",
    diaChi: "",
    theManh: "",
    thumbnail: null, // file mới (nếu có)
    existingThumbnail: "", // giữ link ảnh cũ
  });

  useEffect(() => {
    if (university) {
      setForm({
        tenTruong: university.tenTruong || "",
        maTruong: university.maTruong || "",
        diaChi: university.diaChi || "",
        theManh: university.theManh || "",
        thumbnail: null,
        existingThumbnail: university.thumbnail || "",
      });
    }
  }, [university]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 bg-white rounded shadow">
        <h5 className="mb-3 text-center">✏️ Cập nhật Trường Đại Học</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Tên trường</label>
            <input
              type="text"
              className="form-control"
              name="tenTruong"
              value={form.tenTruong}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Mã trường</label>
            <input
              type="text"
              className="form-control"
              name="maTruong"
              value={form.maTruong}
              onChange={handleChange}
              required
              disabled // thường không cho đổi mã trường vì là key
            />
          </div>
          <div className="form-group mb-3">
            <label>Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="diaChi"
              value={form.diaChi}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Thế mạnh</label>
            <input
              type="text"
              className="form-control"
              name="theManh"
              value={form.theManh}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <label>Hình ảnh (tùy chọn)</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
            {form.existingThumbnail && !form.thumbnail && (
              <img
                src={form.existingThumbnail}
                alt="Thumbnail cũ"
                style={{ marginTop: 10, maxHeight: 100 }}
              />
            )}
            {form.thumbnail && (
              <p className="mt-2">Ảnh mới được chọn: {form.thumbnail.name}</p>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUniversityPopUp;
