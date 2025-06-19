import React, { useState } from "react";
import './AdminSideBar.css';
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
    };

    return (
        <div className="sidebar">
            <header>
                <div className="image-text">
                    <div className="text logo-text">
                        <span className="name">360 BOOK!</span>
                        <span className="profession">Web manager universities</span>
                    </div>
                </div>
            </header>
            <hr style={{ color: "white" }} />

            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">
                        <li className="nav-link">
                            <NavLink to="/admin/manage-dai-hoc">
                                <i className="fa-solid fa-school icon"></i>
                                <span className="text nav-text">Quản lý đại học</span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/admin/manage-nganh-hoc">
                                <i className="fa-solid fa-book icon"></i>
                                <span className="text nav-text">Quản lý ngành học</span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/admin/manage-thoi-gian-thi">
                                <i className="fa-solid fa-calendar-days icon"></i>
                                <span className="text nav-text">Quản lý lịch thi</span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/admin/manage-tin-tuc">
                                <i className="fa-solid fa-newspaper icon"></i>
                                <span className="text nav-text">Quản lý tin tức</span>
                            </NavLink>
                        </li>
                        <li className="nav-link">
                            <NavLink to="/admin/manage-to-hop-mon">
                                <i className="fa-solid fa-chalkboard icon"></i>
                                <span className="text nav-text">Quản lý tổ hợp môn</span>
                            </NavLink>
                        </li>

                        {/* Dropdown: Quản lý điểm chuẩn */}
                        <li className="nav-link">
                            <div className="dropdown-toggle" onClick={toggleDropdown}>
                                <i className="fa-solid fa-star icon"></i>
                                <span className="text nav-text">Quản lý điểm chuẩn</span>
                                <i className={`fa-solid ${isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"}`} style={{ marginLeft: "auto" }}></i>
                            </div>
                            {isDropdownOpen && (
                                <ul className="dropdown-content">
                                    <li>
                                        <NavLink to="/admin/diem-chuan/add">
                                            <span className="text nav-text">➕ Thêm điểm chuẩn</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin/diem-chuan/update">
                                            <span className="text nav-text">📝 Cập nhật điểm chuẩn</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="nav-link">
                            <NavLink to="/admin/hoi-xoay-dap-xoay">
                                <i className="fa-solid fa-circle-question icon"></i>
                                <span className="text nav-text">Quản lý hỏi xoáy đáp xoay</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <hr style={{ color: "white" }} />

                <div>
                    <li className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <div className="logout-link bottom-content">
                            <i className="bx bx-log-out icon"></i>
                            <span className="text nav-text">Logout</span>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default AdminSideBar;
