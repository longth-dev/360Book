import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './UniversityDetail.css';

const UniversityDetail = () => {
    const { comboId, uniId } = useParams();
    const [university, setUniversity] = useState(null);
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let url = `https://your-api/universities/${uniId}`;
        if (comboId) {
            url += `?combo=${comboId}`;
        }
        axios.get(url)
            .then(res => {
                setUniversity(res.data.university || res.data);
                setMajors(res.data.majors || []);
                setLoading(false);
            })
            .catch(err => {
                setError('Không tìm thấy thông tin trường');
                setLoading(false);
            });
    }, [comboId, uniId]);

    // Lấy 3 năm gần nhất từ dữ liệu majors
    const getRecentYears = () => {
        const years = new Set();
        majors.forEach(major => {
            (major.scores || []).forEach(score => years.add(score.year));
        });
        return Array.from(years).sort((a, b) => b - a).slice(0, 3);
    };
    const recentYears = getRecentYears();

    return (
        <>
            <Navbar />
            <div className="university-detail-wrapper">
                <div className="university-detail-breadcrumb">
                    <nav aria-label="breadcrumb">
                        <ol className="university-detail-breadcrumb-list">
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/danh-sach-truong">Danh sách trường</Link></li>
                            <li className="active">{university ? university.name : ''}</li>
                        </ol>
                    </nav>
                </div>
                <div className="university-detail-card">
                    {loading ? (
                        <div className="loader-container" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="loader"></div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-warning text-center">{error}</div>
                    ) : (
                        <>
                            <div className="university-detail-header">
                                <div className="university-detail-title-group">
                                    <span className="university-detail-icon">🎓</span>
                                    <h2 className="university-detail-title">{university.name}</h2>
                                    <span className="university-detail-code">({university.code})</span>
                                </div>
                                <div className="university-detail-combos">
                                    <span className="university-detail-combo-label">Khối xét tuyển:</span>
                                    {university.combinations && university.combinations.map(combo => (
                                        <span key={combo} className="university-detail-combo-badge">{combo}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="university-detail-section">
                                <h3 className="university-detail-section-title">Ngành xét tuyển theo tổ hợp</h3>
                                <div className="university-detail-table-responsive">
                                    <table className="university-detail-table">
                                        <thead>
                                            <tr>
                                                <th>Tên ngành</th>
                                                <th>Mã ngành</th>
                                                {recentYears.map(year => (
                                                    <th key={year}>Điểm chuẩn {year}</th>
                                                ))}
                                                <th>Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {majors.length === 0 ? (
                                                <tr><td colSpan={3 + recentYears.length}>Không có dữ liệu ngành</td></tr>
                                            ) : majors.map((major, idx) => (
                                                <tr key={idx}>
                                                    <td>{major.name}</td>
                                                    <td>{major.code}</td>
                                                    {recentYears.map(year => {
                                                        const scoreObj = (major.scores || []).find(s => s.year === year);
                                                        return (
                                                            <td key={year}>
                                                                {scoreObj ? (
                                                                    <span className="university-detail-score-badge">{scoreObj.score}</span>
                                                                ) : '-'}
                                                            </td>
                                                        );
                                                    })}
                                                    <td>{(major.scores || []).find(s => recentYears.includes(s.year) && s.note)?.note || ''}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UniversityDetail;