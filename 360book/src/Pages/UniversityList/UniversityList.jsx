import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

// Using the same mock data
const mockSubjectCombinations = {
    "A00": {
        name: "Toán - Lý - Hóa",
        universities: [
            { id: 1, name: "Đại học FPT", majors: ["Công nghệ thông tin", "Kỹ thuật phần mềm"], score: 21.5 },
            { id: 2, name: "Đại học Bách Khoa", majors: ["Điện tử", "Cơ khí"], score: 23.0 },
            { id: 3, name: "Đại học Công nghệ", majors: ["CNTT", "Điện tử"], score: 22.5 }
        ]
    },
    "A01": {
        name: "Toán - Lý - Anh",
        universities: [
            { id: 1, name: "Đại học FPT", majors: ["CNTT Tiếng Anh", "IoT"], score: 22.0 },
            { id: 4, name: "Đại học Ngoại Thương", majors: ["Kinh tế đối ngoại", "Logistics"], score: 24.5 }
        ]
    }
};

const UniversityList = () => {
    const { comboId } = useParams();
    const comboData = mockSubjectCombinations[comboId];

    if (!comboData) {
        return (
            <>
                <Navbar />
                <div className="container py-4">
                    <div className="alert alert-warning">
                        Không tìm thấy tổ hợp môn {comboId}
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="mb-4">
                    Danh sách trường xét tuyển tổ hợp {comboId} - {comboData.name}
                </h2>

                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên trường</th>
                                    <th>Ngành xét tuyển</th>
                                    <th>Điểm chuẩn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comboData.universities.map((uni, index) => (
                                    <tr key={uni.id}>
                                        <td>{index + 1}</td>
                                        <td>{uni.name}</td>
                                        <td>{uni.majors.join(", ")}</td>
                                        <td>
                                            <span className="badge bg-primary">
                                                {uni.score.toFixed(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UniversityList;