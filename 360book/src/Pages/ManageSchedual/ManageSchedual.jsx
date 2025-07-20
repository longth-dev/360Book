import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EVENTS = [
    "Ngày Thi tốt nghiệp THPT 2025",
    "Ngày Đăng ký nguyện vọng xét tuyển ĐH 2025",
    "Ngày Công bố điểm thi tốt nghiệp THPT 2025",
    "Ngày Công bố điểm chuẩn Đại học 2025",
    "Ngày Đánh Giá Năng Lực - tại Hồ Chí Minh - Đợt 1 2025",
    "Ngày Đánh Giá Năng Lực - tại Hồ Chí Minh - Đợt 2 2025",
    "Ngày Đánh Giá Năng Lực - tại Hà Nội - Đợt 1 2025",
    "Ngày Đánh Giá Năng Lực - tại Hà Nội - Đợt 2 2025",
];

const ManageSchedule = () => {
    const [dates, setDates] = useState(EVENTS.map(() => ({ startDate: "", endDate: "" })));
    const [loadingIndexes, setLoadingIndexes] = useState([]);
    const [datesAvailable, setDatesAvailable] = useState(EVENTS.map(() => ({ startDate: "", endDate: "" })));
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleDateChange = (index, field, value) => {
        const newDates = [...dates];
        newDates[index] = { ...newDates[index], [field]: value };
        setDates(newDates);
    };
    useEffect(() => {
        const fetchDates = async () => {
            try {
                const res = await axios.get("/api/uni/schedule");
                const dataFromApi = res.data.data || [];

                const newDatesFromApi = EVENTS.map(eventName => {
                    const found = dataFromApi.find(item => item.eventName === eventName);
                    return found
                        ? {
                            startDate: found.startDate ? found.startDate.slice(0, 10) : "",
                            endDate: found.endDate ? found.endDate.slice(0, 10) : ""
                        }
                        : { startDate: "", endDate: "" };
                });

                setDatesAvailable(newDatesFromApi);
            } catch (error) {
                toast.error("Không thể tải dữ liệu lịch từ server");
                console.error(error);
            }
        };

        fetchDates();
    }, []);

    const handleSave = async (index) => {
        const { startDate, endDate } = dates[index];
        if (!startDate || !endDate) {
            toast.error("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
            return;
        }

        try {
            setLoadingIndexes((prev) => [...prev, index]);
            await axios.post("/api/uni/schedule", {
                content: EVENTS[index],
                startDate,
                endDate,
                mainSchedule: true
            });
            toast.success(`Lưu lịch "${EVENTS[index]}" thành công!`);
            const newDatesAvailable = [...datesAvailable];
            newDatesAvailable[index] = { startDate, endDate };
            setDatesAvailable(newDatesAvailable);
        } catch (error) {
            console.error(error);
            toast.error(`Lỗi khi lưu lịch "${EVENTS[index]}".`);
        } finally {
            setLoadingIndexes((prev) => prev.filter(i => i !== index));
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="text-center mb-4">🗓️ Trang Admin - Tạo lịch đếm ngược</h2>

            <div className="row">
                <div className="col-md-3">
                    <ul className="list-group">
                        {EVENTS.map((event, index) => (
                            <li
                                key={index}
                                className={`list-group-item ${selectedIndex === index ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedIndex(index)}
                            >
                                {event}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-9">
                    <div className="card shadow-sm p-3">
                        <h5>{EVENTS[selectedIndex]}</h5>
                        <p>
                            <strong>Ngày có sẵn: </strong>
                            {datesAvailable[selectedIndex].startDate || datesAvailable[selectedIndex].endDate
                                ? `${datesAvailable[selectedIndex].startDate} - ${datesAvailable[selectedIndex].endDate}`
                                : <i>Chưa có ngày</i>}
                        </p>
                        <div className="mb-3">
                            <label className="form-label">Ngày bắt đầu</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={dates[selectedIndex].startDate || ""}
                                onChange={(e) => handleDateChange(selectedIndex, "startDate", e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày kết thúc</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={dates[selectedIndex].endDate || ""}
                                min={dates[selectedIndex].startDate || ""}
                                onChange={(e) => handleDateChange(selectedIndex, "endDate", e.target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-success"
                            disabled={loadingIndexes.includes(selectedIndex)}
                            onClick={() => handleSave(selectedIndex)}
                        >
                            {loadingIndexes.includes(selectedIndex) ? "Đang lưu..." : "Lưu"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ManageSchedule;
