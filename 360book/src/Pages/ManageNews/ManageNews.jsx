import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageNews.css";

const ManageNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        imageUrl: "",
        category: "",
        author: "",
        tags: []
    });

    // Available categories
    const availableCategories = [
        "Tin tuyển sinh", "Tin trường", "Tin giáo dục", "Tin công nghệ", "Tin việc làm"
    ];

    // Available tags
    const availableTags = [
        "Tuyển sinh", "Đại học", "Cao đẳng", "Thi THPT", "Xét tuyển", "Học bổng", "Việc làm"
    ];

    // Fetch danh sách tin tức
    const fetchNews = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Thêm delay 2s để test loader
            const response = await axios.get("/api/news");
            setNewsList(response.data.data || []);
            toast.success("Tải danh sách tin tức thành công");
            setLoading(false); // Loader ẩn khi fetch thành công
        } catch (error) {
            console.error("Lỗi khi tải danh sách tin tức:", error);
            toast.error("Tải danh sách tin tức thất bại");
            setLoading(true); // Loader vẫn hiển thị khi fetch thất bại
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle tag selection
    const handleTagToggle = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            imageUrl: "",
            category: "",
            author: "",
            tags: []
        });
    };

    // Open add modal
    const handleAddClick = () => {
        resetForm();
        setShowModal(true);
    };

    // Handle add new news
    const handleAddNews = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.category) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        try {
            await axios.post("/api/news", formData);
            toast.success("Thêm tin tức thành công!");
            setShowModal(false);
            resetForm();
            fetchNews();
        } catch (error) {
            console.error("Lỗi khi thêm tin tức:", error);
            toast.error("Thêm tin tức thất bại!");
        }
    };

    // Handle delete news
    const handleDeleteNews = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
            try {
                await axios.delete(`/api/news/${id}`);
                toast.success("Xóa tin tức thành công!");
                fetchNews();
            } catch (error) {
                console.error("Lỗi khi xóa tin tức:", error);
                toast.error("Xóa tin tức thất bại!");
            }
        }
    };

    // Handle view news
    const handleViewNews = (news) => {
        // Mở link tin tức trong tab mới
        if (news.link) {
            window.open(news.link, '_blank');
        } else {
            toast.info("Chưa có link cho tin tức này");
        }
    };

    // Filter and pagination
    const filteredNews = newsList.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const currentItems = filteredNews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="manage-news">
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="manage-news-header">
                <h1>📰 Quản lý Tin tức</h1>
                <p>Thêm, xóa và quản lý các tin tức giáo dục</p>
            </div>

            <div className="manage-news-controls">
                <div className="search-section">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="🔍 Tìm kiếm theo tiêu đề, danh mục hoặc tác giả..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="action-section">
                    <button className="add-btn" onClick={handleAddClick}>
                        <span>+</span>
                        Thêm tin tức
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className="news-grid">
                    {currentItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📰</div>
                            <h3>Không có dữ liệu</h3>
                            <p>Chưa có tin tức nào được tạo</p>
                        </div>
                    ) : (
                        currentItems.map((news) => (
                            <div key={news.id} className="news-card">
                                <div className="news-image">
                                    <img
                                        src={news.imageUrl || "https://picsum.photos/300/200"}
                                        alt={news.title}
                                        onError={(e) => {
                                            e.target.src = "https://picsum.photos/300/200";
                                        }}
                                    />
                                    <div className="news-category">{news.category}</div>
                                </div>
                                <div className="news-content">
                                    <h3 className="news-title">{news.title}</h3>
                                    <p className="news-excerpt">
                                        {news.content.length > 150
                                            ? news.content.substring(0, 150) + "..."
                                            : news.content
                                        }
                                    </p>
                                    <div className="news-meta">
                                        <span className="news-author">👤 {news.author}</span>
                                        <span className="news-date">
                                            📅 {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div className="news-tags">
                                        {news.tags && news.tags.map((tag, index) => (
                                            <span key={index} className="news-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="news-actions">
                                        <button
                                            className="view-btn"
                                            onClick={() => handleViewNews(news)}
                                        >
                                            👁️ Xem tin
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteNews(news.id)}
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ← Trước
                    </button>
                    <span className="page-info">
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Sau →
                    </button>
                </div>
            )}

            {/* Add Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="manage-news-modal-content">
                        <div className="modal-header">
                            <h2>Thêm tin tức mới</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleAddNews} className="modal-form">
                            <div className="form-group">
                                <label>Tiêu đề tin tức: *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Nhập tiêu đề tin tức..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nội dung: *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Nhập nội dung tin tức..."
                                    rows="6"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Danh mục: *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {availableCategories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Tác giả:</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tên tác giả..."
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Link hình ảnh:</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="form-group">
                                <label>Tags:</label>
                                <div className="tags-grid">
                                    {availableTags.map(tag => (
                                        <label key={tag} className="tag-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={formData.tags.includes(tag)}
                                                onChange={() => handleTagToggle(tag)}
                                            />
                                            <span>{tag}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="submit-btn">
                                    Thêm tin tức
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNews;
