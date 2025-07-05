import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import './ListUniversitiesView.css';

const ListUniversitiesView = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/api/universities');
                setUniversities(res.data.data || []);
            } catch (err) {
                setError('Không thể tải danh sách trường.');
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    return (
        <>
            <Navbar />
            <div className="univ-list-view-container">
                <h1 className="univ-list-view-title">Danh sách các trường đại học</h1>
                {loading && <div className="univ-list-view-loading">Đang tải...</div>}
                {error && <div className="univ-list-view-error">{error}</div>}
                <div className="univ-list-view-grid">
                    {universities.map(univ => (
                        <Link
                            to={`/universities/${univ.id}`}
                            className="univ-list-view-card"
                            key={univ.id}
                        >
                            <div className="univ-list-view-thumb-wrap">
                                <img
                                    src={univ.thumbnail || 'https://picsum.photos/seed/' + univ.id + '/300/200'}
                                    alt={univ.name}
                                    className="univ-list-view-thumb"
                                />
                            </div>
                            <div className="univ-list-view-name">{univ.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ListUniversitiesView; 