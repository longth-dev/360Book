// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// const ViewToHopMon = () => {
//   const { schoolId } = useParams();
//   const [toHopMonList, setToHopMonList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedId, setSelectedId] = useState("");

//   useEffect(() => {
//     const fetchToHopMon = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           schoolId
//             ? `/api/tohopmon?schoolId=${schoolId}`
//             : "/api/tohopmon"
//         );
//         setToHopMonList(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setToHopMonList([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchToHopMon();
//   }, [schoolId]);

//   const selectedItem = toHopMonList.find((item) => item.id === selectedId);

// return (
//     <>
//         <Navbar />
//         <div className="p-4 min-h-[70vh]">
//             <h1 className="text-xl font-bold mb-4">
//                 {schoolId ? `Tổ hợp môn của trường ${schoolId}` : "Tất cả tổ hợp môn"}
//             </h1>

//             {loading ? (
//                 <p>Đang tải dữ liệu...</p>
//             ) : toHopMonList.length === 0 ? (
//                 <p>Không có dữ liệu.</p>
//             ) : (
//                 <div className="space-y-4">
//                     <div>
//                         <label htmlFor="tohopmon-select" className="block mb-2 font-semibold">
//                             Chọn tổ hợp môn:
//                         </label>
//                         <select
//                             id="tohopmon-select"
//                             value={selectedId}
//                             onChange={(e) => setSelectedId(e.target.value)}
//                             className="border p-2 rounded w-full"
//                         >
//                             <option value="">-- Tất cả --</option>
//                             {toHopMonList.map((item) => (
//                                 <option key={item.id} value={item.id}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <ul className="space-y-2">
//                         {(selectedItem ? [selectedItem] : toHopMonList).map((item) => (
//                             <li key={item.id} className="border p-2 rounded bg-gray-100">
//                                 <p><strong>Mã:</strong> {item.id}</p>
//                                 <p><strong>Tên:</strong> {item.name}</p>
//                                 <p><strong>Môn:</strong> {item.subjects.join(", ")}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//         <Footer />
//     </>
// );
// };

// export default ViewToHopMon;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubjectCombinationViewer.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

// Mock data for subject combinations and universities
const mockSubjectCombinations = {
    'D01': {
        name: 'Toán - Văn - Anh',
        universities: [
            {
                id: 'KHA',
                name: 'Đại học Khánh Hòa',
                majors: [
                    {
                        name: 'Công nghệ thông tin',
                        code: '7480201',
                        scores: [
                            { year: 2023, score: 15.0, note: 'Điểm sàn' },
                            { year: 2022, score: 15.0, note: 'Điểm trúng tuyển' },
                            { year: 2021, score: 15.0, note: 'Điểm trúng tuyển' }
                        ]
                    },
                    {
                        name: 'Kỹ thuật phần mềm',
                        code: '7480203',
                        scores: [
                            { year: 2023, score: 16.0, note: 'Điểm sàn' },
                            { year: 2022, score: 15.5, note: 'Điểm trúng tuyển' },
                            { year: 2021, score: 15.0, note: 'Điểm trúng tuyển' }
                        ]
                    }
                ],
                additionalInfo: 'Điểm xét tuyển = Điểm thi THPT × 3'
            }
        ]
    },
    'A00': {
        name: 'Toán - Lý - Hóa',
        universities: [
            {
                id: 'FPT',
                name: 'Đại học FPT',
                majors: [
                    {
                        name: 'Công nghệ thông tin',
                        code: '7480201',
                        scores: [
                            { year: 2023, score: 21.5, note: 'Điểm sàn' },
                            { year: 2022, score: 21.0, note: 'Điểm trúng tuyển' },
                            { year: 2021, score: 20.5, note: 'Điểm trúng tuyển' }
                        ]
                    },
                    {
                        name: 'Kỹ thuật phần mềm',
                        code: '7480203',
                        scores: [
                            { year: 2023, score: 22.0, note: 'Điểm sàn' },
                            { year: 2022, score: 21.5, note: 'Điểm trúng tuyển' },
                            { year: 2021, score: 21.0, note: 'Điểm trúng tuyển' }
                        ]
                    }
                ],
                additionalInfo: 'Có xét tuyển học bạ THPT'
            }
        ]
    }
};

export default function SubjectCombinationViewer() {
    const [selectedCombo, setSelectedCombo] = useState("");

    const handleComboChange = (e) => {
        setSelectedCombo(e.target.value);
    };

    const currentCombo = selectedCombo ? mockSubjectCombinations[selectedCombo] : null;
    const universityCount = currentCombo ? currentCombo.universities.length : 0;

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="text-center mb-4">Tra cứu tổ hợp môn xét tuyển</h2>

                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={selectedCombo}
                            onChange={handleComboChange}
                        >
                            <option value="">Chọn tổ hợp môn</option>
                            {Object.entries(mockSubjectCombinations).map(([code, data]) => (
                                <option key={code} value={code}>
                                    {code} - {data.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedCombo && (
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="mb-0">
                                    Xem {universityCount} trường đại học xét tuyển {selectedCombo}
                                </h3>
                                <div>
                                    <Link
                                        to={`/universities/${selectedCombo}`}
                                        className="btn btn-primary"
                                    >
                                        Xem danh sách trường
                                    </Link>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên trường</th>
                                            <th>Ngành xét tuyển</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCombo.universities.map((uni, index) => (
                                            <tr key={uni.id}>
                                                <td>{index + 1}</td>
                                                <td>{uni.name}</td>
                                                <td>
                                                    {uni.majors.map(major => major.name).join(", ")}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/university-detail/${selectedCombo}/${uni.id}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Xem chi tiết
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

