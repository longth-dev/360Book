import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./ExamSchedule.css";

const examData = [
    {
        date: "25/6/2025",
        sessions: [
            {
                time: "SÁNG",
                events: [
                    {
                        subject: "Họp cán bộ làm công tác coi thi tại Điểm thi",
                        start: "08:00",
                        duration: "-",
                        note: "Họp cán bộ"
                    }
                ]
            },
            {
                time: "CHIỀU",
                events: [
                    {
                        subject: "Thí sinh làm thủ tục dự thi tại phòng thi, đính chính sai sót (nếu có) và nghe phổ biến Quy chế thi, Lịch thi",
                        start: "14:00",
                        duration: "-",
                        note: "Thủ tục dự thi"
                    }
                ]
            }
        ]
    },
    {
        date: "26/6/2025",
        sessions: [
            {
                time: "SÁNG",
                events: [
                    {
                        subject: "Ngữ văn",
                        start: "07:35",
                        duration: "120 phút",
                        note: ""
                    }
                ]
            },
            {
                time: "CHIỀU",
                events: [
                    {
                        subject: "Toán",
                        start: "14:30",
                        duration: "90 phút",
                        note: ""
                    }
                ]
            }
        ]
    },
    {
        date: "27/6/2025",
        sessions: [
            {
                time: "SÁNG",
                events: [
                    {
                        subject: "Vật lí",
                        start: "07:35",
                        duration: "50 phút",
                        note: "Bài thi KHTN"
                    },
                    {
                        subject: "Hóa học",
                        start: "08:35",
                        duration: "50 phút",
                        note: "Bài thi KHTN"
                    },
                    {
                        subject: "Sinh học",
                        start: "09:35",
                        duration: "50 phút",
                        note: "Bài thi KHTN"
                    },
                    {
                        subject: "Lịch sử",
                        start: "07:35",
                        duration: "50 phút",
                        note: "Bài thi KHXH"
                    },
                    {
                        subject: "Địa lí",
                        start: "08:35",
                        duration: "50 phút",
                        note: "Bài thi KHXH"
                    },
                    {
                        subject: "Giáo dục công dân",
                        start: "09:35",
                        duration: "50 phút",
                        note: "Bài thi KHXH"
                    }
                ]
            }
        ]
    },
    {
        date: "27/6/2025",
        sessions: [
            {
                time: "CHIỀU",
                events: [
                    {
                        subject: "Ngoại ngữ",
                        start: "14:30",
                        duration: "60 phút",
                        note: ""
                    }
                ]
            }
        ]
    },
    {
        date: "28/6/2025",
        sessions: [
            {
                time: "DỰ PHÒNG",
                events: [
                    {
                        subject: "Dự phòng",
                        start: "-",
                        duration: "-",
                        note: ""
                    }
                ]
            }
        ]
    }
];

export default function ExamSchedule() {
    return (
        <>
            <Navbar />
            <div className="exam-schedule-page">
                <h1 className="exam-title">Lịch thi tốt nghiệp THPT Quốc gia 2025</h1>
                <div className="infographic-container">
                    {examData.map((day, idx) => (
                        <div className="info-day-block" key={day.date}>
                            <div className="info-date">
                                <span className="info-date-icon">📅</span>
                                <span className="info-date-text">{day.date}</span>
                            </div>
                            <div className="info-sessions">
                                {day.sessions.map((session, sidx) => (
                                    <div className="info-session" key={session.time + sidx}>
                                        <div className="info-session-title">
                                            {session.time === "SÁNG" && <span>🌞</span>}
                                            {session.time === "CHIỀU" && <span>🌙</span>}
                                            {session.time === "DỰ PHÒNG" && <span>🛠️</span>}
                                            <span>{session.time}</span>
                                        </div>
                                        <div className="info-events">
                                            {session.events.map((event, eidx) => (
                                                <div className="info-event-card" key={event.subject + eidx}>
                                                    <div className="info-event-main">
                                                        <span className="info-event-icon">📖</span>
                                                        <span className="info-event-subject">{event.subject}</span>
                                                    </div>
                                                    <div className="info-event-detail">
                                                        {event.start !== "-" && (
                                                            <span className="info-event-time">🕒 {event.start}</span>
                                                        )}
                                                        {event.duration !== "-" && (
                                                            <span className="info-event-duration">⏳ {event.duration}</span>
                                                        )}
                                                        {event.note && <span className="info-event-note">💡 {event.note}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
