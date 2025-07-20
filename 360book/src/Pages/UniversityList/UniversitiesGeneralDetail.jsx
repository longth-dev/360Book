import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './ListUniversitiesView.css';

const accentColor = '#225bbf';

const UniversitiesGeneralDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`/api/universities/${id}`);
                setData(res.data.data);
            } catch (err) {
                setError('Không thể tải dữ liệu trường.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="list-loader-container" style={{ minHeight: 300 }}>
                    <div className="list-loader"></div>
                </div>
                <Footer />
            </>
        );
    }
    if (error) {
        return (
            <>
                <Navbar />
                <div className="text-center text-danger my-4">{error}</div>
                <Footer />
            </>
        );
    }
    if (!data) return null;

    return (
        <>
            <Navbar />
            <div className="container py-4" style={{ minHeight: '70vh' }}>
                <div
                    className="shadow-sm p-4 mb-4 bg-white rounded"
                    style={{ borderLeft: `6px solid ${accentColor}`, maxWidth: 700, margin: '0 auto' }}
                >
                    <h2 className="fw-bold mb-2" style={{ color: accentColor }}>
                        {data.universityName}{' '}
                        <span className="badge" style={{ background: accentColor, color: '#fff', fontSize: 18 }}>
                            {data.code}
                        </span>
                    </h2>
                    <div className="mb-1">
                        <strong>Địa chỉ:</strong> {data.address || <span className="text-muted">Chưa cập nhật</span>}
                    </div>
                    <div className="mb-1">
                        <strong>Loại trường:</strong> {data.main || <span className="text-muted">Chưa cập nhật</span>}
                    </div>
                </div>
                <h4 className="mb-3" style={{ color: accentColor, fontWeight: 700 }}>Danh sách ngành đào tạo</h4>
                <div className="table-responsive">
                    <table
                        className="table align-middle"
                        style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(34,91,191,0.07)' }}
                    >
                        <thead style={{ background: accentColor, color: '#fff' }}>
                            <tr>
                                <th style={{ minWidth: 160 }}>Tên ngành</th>
                                <th style={{ minWidth: 180 }}>Tổ hợp môn</th>
                                <th style={{ minWidth: 220 }}>Điểm chuẩn các năm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.universityMajors.map((major) => (
                                <tr key={major.majorId} style={{ background: '#f8fafd' }}>
                                    <td className="fw-semibold" style={{ color: accentColor }}>{major.majorName}</td>
                                    <td>
                                        {major.combo.map((c) => (
                                            <div key={c.codeCombination} style={{ marginBottom: 2 }}>
                                                <span
                                                    className="badge me-1"
                                                    style={{ background: accentColor, color: '#fff', fontWeight: 500 }}
                                                >
                                                    {c.codeCombination}
                                                </span>
                                                <span style={{ color: '#333' }}>{c.subjectName.join(', ')}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {major.scoreOverview.map((yearObj) => (
                                            <div key={yearObj.year} className="mb-2">
                                                <div className="fw-bold" style={{ color: accentColor }}>Năm {yearObj.year}:</div>
                                                <ul className="mb-0 ps-3">
                                                    {yearObj.scoreDetails.map((s, idx) => (
                                                        <li key={s.type + idx}>
                                                            <span style={{ color: accentColor, fontWeight: 600 }}>{s.type}</span>: <span className="fw-semibold">{s.score}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UniversitiesGeneralDetail; 