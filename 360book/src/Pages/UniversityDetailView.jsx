import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import './UniversityDetailView.css';

const UniversityDetailView = () => {
    const { id } = useParams();
    const [univ, setUniv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUniv = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/universities/${id}`);
                setUniv(res.data.data);
            } catch (err) {
                setError('Không thể tải thông tin trường.');
            } finally {
                setLoading(false);
            }
        };
        fetchUniv();
    }, [id]);

    if (loading) return <div className="univ-detail-view-loading">Đang tải...</div>;
    if (error) return <div className="univ-detail-view-error">{error}</div>;
    if (!univ) return null;

    return (
        <>
            <Navbar />
            <div className="univ-detail-view-container">
                <Link to="/universities" className="univ-detail-view-back">← Quay lại danh sách</Link>
                <div className="univ-detail-view-card">
                    <div className="univ-detail-view-thumb-wrap">
                        <img
                            src={univ.thumbnail || 'https://picsum.photos/seed/' + univ.id + '/400/250'}
                            alt={univ.name}
                            className="univ-detail-view-thumb"
                        />
                    </div>
                    <div className="univ-detail-view-info">
                        <h1 className="univ-detail-view-name">{univ.name}</h1>
                        <div className="univ-detail-view-desc">{univ.description || 'Chưa có mô tả.'}</div>
                        {/* Thêm các thông tin khác nếu có */}
                        {univ.address && (
                            <div className="univ-detail-view-row"><b>Địa chỉ:</b> {univ.address}</div>
                        )}
                        {univ.website && (
                            <div className="univ-detail-view-row"><b>Website:</b> <a href={univ.website} target="_blank" rel="noopener noreferrer">{univ.website}</a></div>
                        )}
                        {univ.phone && (
                            <div className="univ-detail-view-row"><b>Điện thoại:</b> {univ.phone}</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UniversityDetailView; 