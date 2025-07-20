import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './FilterUniversities.css';
import axios from 'axios';

const accentColor = '#225bbf';

const FilterUniversities = () => {
    const { comboId, strengthId } = useParams();
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterName, setFilterName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                let res;
                if (comboId) {
                    res = await axios.get(`/api/universities/by-combo/${comboId}`);
                    setFilterName(res.data.comboName || 'Khối tổ hợp môn');
                } else if (strengthId) {
                    res = await axios.get(`/api/universities/by-strength/${strengthId}`);
                    setFilterName(res.data.strengthName || 'Thế mạnh');
                }
                setUniversities(res.data.data || []);
            } catch (err) {
                setError('Không thể tải danh sách trường.');
                setUniversities([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [comboId, strengthId]);

    return (
        <>
            <Navbar />
            <div className="container py-4 min-vh-100">
                <div className="card shadow p-4 mb-4" style={{ borderRadius: 16 }}>
                    <h3 className="mb-3" style={{ color: accentColor }}>
                        Danh sách trường theo {comboId ? 'Khối tổ hợp môn' : 'Thế mạnh'}: <span style={{ color: '#111' }}>{filterName}</span>
                    </h3>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="list-loader" style={{ margin: '0 auto' }}></div>
                            <div className="mt-3 text-muted">Đang tải danh sách trường...</div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : universities.length === 0 ? (
                        <div className="text-center text-muted py-5">Không có trường nào phù hợp.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Tên trường</th>
                                        <th>Mã trường</th>
                                        <th>Thế mạnh</th>
                                        <th>Ngành nổi bật</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {universities.map(uni => (
                                        <tr key={uni.universityId} style={{ cursor: 'pointer' }} onClick={() => navigate(`/universities/${uni.universityId}`)}>
                                            <td style={{ color: accentColor, fontWeight: 600 }}>{uni.universityName}</td>
                                            <td>{uni.code}</td>
                                            <td>{uni.strength || 'Chưa cập nhật'}</td>
                                            <td>{uni.majors ? uni.majors.join(', ') : 'Chưa cập nhật'}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-sm">Xem chi tiết</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FilterUniversities; 