import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
    const navigate = useNavigate();
    const location = useLocation();
    const preselectedCombo = location.state?.selectedCombo || '';
    const [selectedComboCode, setSelectedComboCode] = useState(preselectedCombo);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`/api/uni/v1/${id}`);
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

    const allCombos = data.universityMajors.flatMap(major => major.combo || []);
    const uniqueComboCodes = [...new Set(allCombos.map(c => c.codeCombination))];

    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ minHeight: '70vh' }}>
                {/* Header */}
                <div className="row align-items-center mb-5">
                    {data.thumbnail && (
                        <div className="col-md-3 text-center mb-3 mb-md-0">
                            <img
                                src={data.thumbnail}
                                alt={data.universityName}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: 200, objectFit: 'contain' }}
                            />
                        </div>
                    )}
                    <div className="col-md-6">
                        <h2 className="fw-bold" style={{ color: accentColor }}>
                            {data.universityName}{' '}
                            <span className="badge bg-primary">{data.code}</span>
                        </h2>
                        <p className="mb-1">
                            <strong>Địa chỉ:</strong>{' '}
                            {data.address || <span className="text-muted">Chưa cập nhật</span>}
                        </p>
                        <p className="mb-0">
                            <strong>Loại trường:</strong>{' '}
                            {data.main || <span className="text-muted">Chưa cập nhật</span>}
                        </p>
                    </div>
                    <div className="col-md-3 text-md-end text-center mt-3 mt-md-0">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                navigate('/diem-chuan', {
                                    state: { universityId: data.universityId },
                                })
                            }
                        >
                            Xem điểm chuẩn
                        </button>
                    </div>
                </div>
                {/* Major list */}
                <h4 className="mb-3 fw-bold" style={{ color: accentColor }}>
                    Danh sách ngành đào tạo
                </h4>
                <div className="mb-3">
                    <select
                        id="comboFilter"
                        className="form-select"
                        value={selectedComboCode}
                        onChange={(e) => setSelectedComboCode(e.target.value)}
                    >
                        <option value="">-- Hiển thị tất cả --</option>
                        {[...new Map(
                            allCombos.map(c => [c.codeCombination, c])
                        )].map(([code, combo]) => (
                            <option key={code} value={code}>
                                {code} – {combo.subjectName.join(", ")}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle shadow-sm bg-white">
                        <thead className="table-primary">
                            <tr>
                                <th style={{ width: '20%' }}>Mã ngành</th>
                                <th style={{ width: '40%' }}>Tên ngành</th>
                                <th style={{ width: '40%' }}>Tổ hợp môn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.universityMajors
                                .filter(major =>
                                    !selectedComboCode ||
                                    major.combo.some(c => c.codeCombination === selectedComboCode)
                                )
                                .map((major) => (
                                    <tr key={major.majorId}>
                                        <td style={{ color: accentColor }}>
                                            <strong>{major.majorCode}</strong>
                                        </td>
                                        <td style={{ color: accentColor }}>
                                            <strong>{major.majorName}</strong>
                                        </td>
                                        <td>
                                            {major.combo.map((c) => (
                                                <div
                                                    key={c.codeCombination}
                                                    className="mb-1 d-flex align-items-start"
                                                >
                                                    <span
                                                        className="badge me-2"
                                                        style={{
                                                            background: accentColor,
                                                            color: '#fff',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {c.codeCombination}
                                                    </span>
                                                    <span style={{ color: '#333' }}>
                                                        {c.subjectName.join(', ')}
                                                    </span>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UniversitiesGeneralDetail; 