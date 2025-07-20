import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EVENTS = [
    "Kỳ thi tốt nghiệp THPT",
    "Mở đăng ký nguyện vọng",
    "Hạn cuối đăng ký nguyện vọng",
    "Công bố điểm thi",
    "Công bố điểm chuẩn",
    "Xét tuyển bổ sung",
    "Nhập học đợt 1",
    "Nhập học đợt 2",
];

const ManageSchedule = () => {
    const [dates, setDates] = useState(Array(EVENTS.length).fill(""));
    const [loadingIndexes, setLoadingIndexes] = useState([]);
    const [datesAvailable, setDatesFromApi] = useState(Array(EVENTS.length).fill(""));

    const handleDateChange = (index, value) => {
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const res = await axios.get("/api/schedule");
                const dataFromApi = res.data.data || [];
                const newDatesFromApi = EVENTS.map(eventName => {
                    const found = dataFromApi.find(item => item.eventName === eventName);
                    return found ? found.eventDate.slice(0,10) : "";
                });

                setDatesFromApi(newDatesFromApi);
            } catch (error) {
                toast.error("Không thể tải dữ liệu lịch từ server");
                console.error(error);
            }
        };

        fetchDates();
    }, []);


    const handleSave = async (index) => {
        const date = dates[index];
        if (!date) {
            toast.error("Vui lòng chọn ngày cho sự kiện.");
            return;
        }
        try {
            setLoadingIndexes((prev) => [...prev, index]);
            await axios.post("/api/schedule", {
                    eventName: EVENTS[index],
                    eventDate: date,
            });
            toast.success(`Tạo lịch "${EVENTS[index]}" thành công!`);
        } catch (error) {
            console.error(error);
            toast.error(`Lỗi khi tạo lịch "${EVENTS[index]}".`);
        } finally {
            setLoadingIndexes((prev) => prev.filter(i => i !== index));
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="text-center mb-4">🗓️ Trang Admin - Tạo lịch đếm ngược</h2>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Sự kiện</th>
                        <th>Ngày Có Sẵn</th>
                        <th>Chọn ngày</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {EVENTS.map((event, index) => (
                        <tr key={index}>
                            <td>{event}</td>
                            <td>{datesAvailable[index] || <i>Chưa có ngày</i>}</td>
                            <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dates[index]}
                                    onChange={(e) => handleDateChange(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    disabled={loadingIndexes.includes(index)}
                                    onClick={() => handleSave(index)}
                                >
                                    {loadingIndexes.includes(index) ? "Đang lưu..." : "Lưu"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSchedule;
