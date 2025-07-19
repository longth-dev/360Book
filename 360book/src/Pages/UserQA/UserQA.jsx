// UserQA.jsx
import React, { useEffect, useState } from "react";
import "./UserQA.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserQA = () => {
  const [qaList, setQaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchQAList = async () => {
    try {
      const response = await axios.get("/api/user-qa"); // 🔁 thay endpoint thật ở đây
      setQaList(response.data.data || []);
      toast.success("Tải danh sách Q&A thành công!");
    } catch (error) {
      console.error("Lỗi khi fetch Q&A:", error);
      toast.error("Không thể tải Q&A");
    }
  };

  useEffect(() => {
    fetchQAList();
  }, []);

  const filteredQA = qaList.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQA.length / itemsPerPage);
  const currentItems = filteredQA.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="userqa-container bg-light min-vh-100 p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className="mb-4 text-center">💬 Hỏi & Đáp Người Dùng</h1>

        

        <div className="qa-list row">
          {currentItems.length === 0 ? (
            <div className="text-center w-100 py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <p className="mt-3">Không tìm thấy dữ liệu phù hợp.</p>
            </div>
          ) : (
            currentItems.map((qa, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="qa-card shadow-sm p-3 rounded bg-white h-100">
                  <h5 className="text-primary mb-2">❓ {qa.question}</h5>
                  <p className="text-muted">
                    <strong>💬 Trả lời:</strong>{" "}
                    {qa.answer || "Chưa có câu trả lời"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserQA;
