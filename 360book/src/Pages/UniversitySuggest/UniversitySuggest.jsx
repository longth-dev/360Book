import { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export default function UniversitySuggest() {
    const [score, setScore] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSuggest = async () => {
        const s = parseFloat(score);
        if (isNaN(s) || s < 0 || s > 30) {
            alert("Vui lòng nhập tổng điểm hợp lệ (0-30)");
            return;
        }
        setLoading(true);
        try {
            // Ví dụ: API trả về danh sách trường với các trường có minScore <= s
            // Thay URL bên dưới bằng API thực tế của bạn
            const res = await axios.get("/api/universities", { params: { minScore: s } });
            setResult(res.data || []);
        } catch (err) {
            alert("Không thể lấy dữ liệu trường đại học.");
            setResult([]);
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <div className="suggest-container" style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #bcd2f7", padding: 32 }}>
                <h2 style={{ color: "#225BBF", textAlign: "center", marginBottom: 24 }}>Gợi ý trường đại học phù hợp</h2>
                <div style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "center" }}>
                    <input
                        type="number"
                        min="0"
                        max="30"
                        step="0.01"
                        value={score}
                        onChange={e => setScore(e.target.value)}
                        placeholder="Nhập tổng điểm thi đại học"
                        style={{ padding: "10px 16px", borderRadius: 8, border: "1.5px solid #bcd2f7", fontSize: "1.1rem", width: 220 }}
                    />
                    <button
                        style={{
                            background: "linear-gradient(90deg, #225BBF 60%, #3a8dde 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "10px 28px",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            cursor: "pointer"
                        }}
                        onClick={handleSuggest}
                        disabled={loading}
                    >
                        {loading ? "Đang tìm..." : "Gợi ý trường"}
                    </button>
                </div>
                {result.length > 0 ? (
                    <div>
                        <h3 style={{ color: "#225BBF", marginBottom: 12 }}>Các trường phù hợp:</h3>
                        <ul style={{ paddingLeft: 20 }}>
                            {result.map((u, idx) => (
                                <li key={idx} style={{ marginBottom: 8 }}>
                                    <strong>{u.name}</strong> - {u.major} (Điểm chuẩn: {u.minScore})
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p style={{ color: "#888", textAlign: "center" }}>Chưa có kết quả phù hợp.</p>
                )}
            </div>
            <Footer />
        </>
    );
}