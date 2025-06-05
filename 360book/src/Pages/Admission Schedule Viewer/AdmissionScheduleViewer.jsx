// import React, { useState, useEffect } from "react";
// import "./AdmissionScheduleViewer.css";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// import axios from 'axios';

// const scheduleTypes = [
//     { value: "national_exam", label: "National Graduation Exam" },
//     { value: "university", label: "Individual University Schedules" },
// ];

// export default function AdmissionScheduleViewer() {
//     const [selectedType, setSelectedType] = useState(scheduleTypes[0].value);
//     const [schedules, setSchedules] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSchedules = async () => {
//             try {
//                 setLoading(true);
//                 // Replace with your actual API endpoint
//                 const response = await axios.get(`/api/schedules/${selectedType}`);
//                 setSchedules(response.data);
//                 setError(null);
//             } catch (err) {
//                 setError('Failed to fetch schedules');
//                 console.error('Error fetching schedules:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchedules();
//     }, [selectedType]);

//     const handleTypeChange = (e) => {
//         setSelectedType(e.target.value);
//     };

//     const currentSchedule = schedules[selectedType];

//     return (
//         <>
//             <Navbar />
//             <div className="admission-schedule-viewer">
//                 <h2>Admission Schedule Viewer</h2>
//                 <div className="selector">
//                     <label htmlFor="scheduleType">Select Schedule Type:</label>
//                     <select
//                         id="scheduleType"
//                         value={selectedType}
//                         onChange={handleTypeChange}
//                     >
//                         {scheduleTypes.map((type) => (
//                             <option key={type.value} value={type.value}>
//                                 {type.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="schedule-display">
//                     {loading ? (
//                         <div>Loading...</div>
//                     ) : error ? (
//                         <div className="error">{error}</div>
//                     ) : currentSchedule ? (
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Date</th>
//                                     <th>Event</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentSchedule.map((item, idx) => (
//                                     <tr key={idx}>
//                                         <td>{item.date}</td>
//                                         <td>{item.event}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <div className="coming-soon">Coming Soon</div>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

import React, { useState } from "react";
import "./AdmissionScheduleViewer.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const scheduleTypes = [
    { value: "national_exam", label: "National Graduation Exam" },
    { value: "university", label: "Individual University Schedules" },
];

const mockSchedules = {
    national_exam: [
        { date: "2025-06-27", event: "Registration Deadline" },
        { date: "2025-07-02", event: "Literature Exam" },
        { date: "2025-07-03", event: "Mathematics Exam" },
        { date: "2025-07-04", event: "Foreign Language Exam" },
        { date: "2025-07-05", event: "Natural Sciences/Social Sciences Exam" },
        { date: "2025-07-20", event: "Results Announcement" }
    ],
    university: [
        { date: "2025-08-01", event: "University Application Period Begins" },
        { date: "2025-08-15", event: "First Round Application Deadline" },
        { date: "2025-08-20", event: "First Round Results" },
        { date: "2025-08-25", event: "Second Round Application Begins" },
        { date: "2025-09-01", event: "Final Admission Results" }
    ]
};

export default function AdmissionScheduleViewer() {
    const [selectedType, setSelectedType] = useState(scheduleTypes[0].value);
    const [schedules] = useState(mockSchedules);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const currentSchedule = schedules[selectedType];

    return (
        <>
            <Navbar />
            <div className="admission-schedule-viewer">
                <h2>Admission Schedule Viewer</h2>
                <div className="selector">
                    <label htmlFor="scheduleType">Select Schedule Type:</label>
                    <select
                        id="scheduleType"
                        value={selectedType}
                        onChange={handleTypeChange}
                    >
                        {scheduleTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="schedule-display">
                    {currentSchedule ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Event</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSchedule.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.date}</td>
                                        <td>{item.event}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="coming-soon">Coming Soon</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}