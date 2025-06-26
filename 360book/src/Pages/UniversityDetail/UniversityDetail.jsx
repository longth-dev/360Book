import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const mockSubjectCombinations = {
    'D01': {
        name: 'Toán - Văn - Anh',
        universities: [
            {
                id: 'KHA',
                name: 'Đại học Khánh Hòa',
                majors: [
                    {
                        name: 'Công nghệ thông tin',
                        code: '7480201',
                        scores: [
                            { year: 2023, score: 15.0, note: 'Điểm sàn' },
                            { year: 2022, score: 15.0, note: 'Điểm trúng tuyển' },
                            { year: 2021, score: 15.0, note: 'Điểm trúng tuyển' }
                        ]
                    },
                    {
                        name: 'Kỹ thuật phần mềm',
                        code: '7480203',
                        scores: [
                            { year: 2023, score: 16.0, note: 'Điểm sàn' },
                            { year: 2022, score: 15.5, note: 'Điểm trúng tuyển' },
                            { year: 2021, score: 15.0, note: 'Điểm trúng tuyển' }
                        ]
                    }
                ],
                additionalInfo: 'Điểm xét tuyển = Điểm thi THPT × 3'
            }
        ]
    }
};

const UniversityDetail = () => {
    const { comboId, uniId } = useParams();
    const university = mockSubjectCombinations[comboId]?.universities
        .find(uni => uni.id === uniId);

    if (!university) {
        return (
            <>
                <Navbar />
                <div className="container py-4">
                    <div className="alert alert-warning">
                        Không tìm thấy thông tin trường
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <div className="breadcrumb-wrapper mb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/subject-combination-viewer">Tổ hợp môn</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {university.name}
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                        <h2 className="card-title h4 mb-0">
                            Điểm chuẩn {university.name} - Tổ hợp {comboId} ({mockSubjectCombinations[comboId].name})
                        </h2>
                    </div>
                    <div className="card-body">
                        {university.additionalInfo && (
                            <div className="alert alert-info mb-4">
                                <i className="fas fa-info-circle me-2"></i>
                                {university.additionalInfo}
                            </div>
                        )}

                        {university.majors.map((major, index) => (
                            <div key={index} className="major-section mb-4">
                                <h3 className="h5 mb-3">
                                    {major.name} (Mã ngành: {major.code})
                                </h3>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Năm</th>
                                                <th>Điểm chuẩn</th>
                                                <th>Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {major.scores.map((score, idx) => (
                                                <tr key={idx}>
                                                    <td>{score.year}</td>
                                                    <td>
                                                        <span className="badge bg-primary">
                                                            {score.score.toFixed(1)}
                                                        </span>
                                                    </td>
                                                    <td>{score.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UniversityDetail;