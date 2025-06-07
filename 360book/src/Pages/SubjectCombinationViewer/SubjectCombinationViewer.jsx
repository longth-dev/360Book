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
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./SubjectCombinationViewer.css";

// Mock data for testing
const mockToHopMon = [
    {
        id: "A00",
        name: "Toán - Lý - Hóa",
        subjects: ["Toán", "Vật lý", "Hóa học"]
    },
    {
        id: "A01",
        name: "Toán - Lý - Anh",
        subjects: ["Toán", "Vật lý", "Tiếng Anh"]
    },
    {
        id: "B00",
        name: "Toán - Hóa - Sinh",
        subjects: ["Toán", "Hóa học", "Sinh học"]
    },
    {
        id: "D01",
        name: "Toán - Văn - Anh",
        subjects: ["Toán", "Ngữ văn", "Tiếng Anh"]
    }
];

const SubjectCombinationViewer = () => {
    const [selectedId, setSelectedId] = useState("");

    const selectedItem = mockToHopMon.find((item) => item.id === selectedId);

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h1 className="text-center mb-4">Tổ hợp môn xét tuyển</h1>

                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <label htmlFor="tohopmon-select" className="form-label">
                            Chọn tổ hợp môn:
                        </label>
                        <select
                            id="tohopmon-select"
                            className="form-select"
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                        >
                            <option value="">-- Tất cả --</option>
                            {mockToHopMon.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.id} - {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {(selectedItem ? [selectedItem] : mockToHopMon).map((item) => (
                        <div key={item.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.id}</h5>
                                    <h6 className="card-subtitle mb-3 text-muted">{item.name}</h6>
                                    <div className="card-text">
                                        <p className="fw-bold mb-2">Các môn thi:</p>
                                        <ul className="list-unstyled">
                                            {item.subjects.map((subject, index) => (
                                                <li key={index} className="mb-2">
                                                    <span className="badge bg-primary me-2">{index + 1}</span>
                                                    {subject}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SubjectCombinationViewer;