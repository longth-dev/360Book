import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ManageSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get("/api/schedule/all");
            setSchedules(response.data.data || []);
        } catch (error) {
            toast.error("Không thể tải lịch thi.");
            console.error(error);
        }
    };

    const handleDateChange = (index, date) => {
        const newSchedules = [...schedules];
        newSchedules[index].eventDate = date;
        setSchedules(newSchedules);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post("/api/schedule/update", schedules);
            if (response.data.success) {
                toast.success("Cập nhật lịch thi thành công!");
            } else {
                toast.error("Cập nhật thất bại.");
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật lịch thi.");
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="mb-4 text-center">📅 Quản lý Lịch thi - Ngày đếm ngược</h2>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Sự kiện</th>
                        <th>Ngày</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.eventName}</td>
                            <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={item.eventDate ? item.eventDate.slice(0, 10) : ""}
                                    onChange={(e) => handleDateChange(index, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-end">
                <button className="btn btn-primary" onClick={handleSave}>💾 Lưu thay đổi</button>
            </div>
        </div>
    );
};

export default ManageSchedule;
