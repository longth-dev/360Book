import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import './ListUniversitiesView.css';

// MOCK DATA
const MOCK_UNIVERSITIES = [
    {
        id: 1,
        name: 'HCMUTE - Đại học Sư phạm Kỹ thuật TP.HCM',
        thumbnail: 'https://picsum.photos/seed/hcmute/300/200',
        website: 'https://hcmute.edu.vn',
    },
    {
        id: 2,
        name: 'HUST - Đại học Bách khoa Hà Nội',
        thumbnail: 'https://picsum.photos/seed/hust/300/200',
        website: 'https://hust.edu.vn',
    },
    {
        id: 3,
        name: 'UEH - Đại học Kinh tế TP.HCM',
        thumbnail: 'https://picsum.photos/seed/ueh/300/200',
        website: 'https://ueh.edu.vn',
    },
    {
        id: 4,
        name: 'VNUHCM - Đại học Quốc gia TP.HCM',
        thumbnail: 'https://picsum.photos/seed/vnuhcm/300/200',
        website: 'https://vnuhcm.edu.vn',
    },
    {
        id: 5,
        name: 'VNUHN - Đại học Quốc gia Hà Nội',
        thumbnail: 'https://picsum.photos/seed/vnuhn/300/200',
        website: 'https://vnu.edu.vn',
    },
];

const ListUniversitiesView = () => {
    // const [universities, setUniversities] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // useEffect(() => {
    //   const fetchUniversities = async () => {
    //     try {
    //       setLoading(true);
    //       const res = await axios.get('/api/universities');
    //       setUniversities(res.data.data || []);
    //     } catch (err) {
    //       setError('Không thể tải danh sách trường.');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   fetchUniversities();
    // }, []);

    // Dùng mock data thay cho universities
    const universities = MOCK_UNIVERSITIES;
    // const loading = false;
    // const error = null;

    // Lọc trường theo search
    const filteredUniversities = search.trim()
        ? universities.filter(univ =>
            univ.name.toLowerCase().includes(search.trim().toLowerCase())
        )
        : [];

    // Khi click suggestion
    const handleSuggestionClick = (website) => {
        if (website) {
            window.open(website, '_blank');
        }
        setShowSuggestions(false);
        setSearch('');
    };

    return (
        <>
            <Navbar />
            <div className="univ-list-view-container">
                <h1 className="univ-list-view-title">Danh sách các trường đại học</h1>
                <div className="univ-list-view-search-wrap">
                    <input
                        className="univ-list-view-search-input"
                        type="text"
                        placeholder="Tìm kiếm tên trường..."
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />
                    {showSuggestions && search.trim() && filteredUniversities.length > 0 && (
                        <ul className="univ-list-view-suggestions">
                            {filteredUniversities.map(univ => (
                                <li
                                    key={univ.id}
                                    className="univ-list-view-suggestion-item"
                                    onClick={() => handleSuggestionClick(univ.website)}
                                >
                                    {univ.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* {loading && <div className="univ-list-view-loading">Đang tải...</div>}
        {error && <div className="univ-list-view-error">{error}</div>} */}
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