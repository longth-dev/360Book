import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=ffecb3&color=2d3a8c&size=128";

export default function UserProfile() {
    const [user, setUser] = useState(null); // ban đầu là null
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // TODO: Thay URL này bằng API thật khi có
        axios.get("URL_API_GET_USER_PROFILE")
            .then(res => {
                setUser(res.data);
                setNewEmail(res.data.email || "");
            })
            .catch(err => {
                console.error(err);
                alert("Không thể lấy thông tin người dùng. Vui lòng thử lại sau!");
                // Không setUser, user sẽ là null
            });
    }, []);

    const handleEmailUpdate = e => {
        e.preventDefault();
        axios.put("URL_API_UPDATE_EMAIL", { email: newEmail })
            .then(res => {
                setUser({ ...user, email: newEmail, emailVerified: false });
                setShowEmailForm(false);
            })
            .catch(err => alert("Cập nhật email thất bại!"));
    };

    const handlePasswordUpdate = e => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        // TODO: Thay URL này bằng API thật khi có
        axios.put("URL_API_UPDATE_PASSWORD", { password: newPassword })
            .then(res => {
                setShowPasswordForm(false);
                setNewPassword("");
                setConfirmPassword("");
            })
            .catch(err => alert("Cập nhật mật khẩu thất bại!"));
    };

    const handleVerifyEmail = () => {
        // TODO: Thay URL này bằng API thật khi có
        axios.post("URL_API_VERIFY_EMAIL", { email: user.email })
            .then(res => {
                alert("Đã gửi email xác thực đến " + user.email + "!");
            })
            .catch(err => alert("Gửi email xác thực thất bại!"));
    };

    const handleAvatarChange = e => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = ev => {
                setUser({ ...user, avatar: ev.target.result });
            };
            reader.readAsDataURL(file);
            // TODO: Thay URL này bằng API thật khi có
            // const formData = new FormData();
            // formData.append("avatar", file);
            // axios.post("URL_API_UPLOAD_AVATAR", formData)
            //     .then(res => { ... })
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="user-profile-page">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h1 className="profile-title">Thông tin cá nhân</h1>
                    <button
                        className="btn btn-outline-primary"
                        style={{ borderRadius: 8, fontWeight: 500 }}
                        onClick={() => navigate('/nguoi-dung/truong-yeu-thich')}
                    >
                        Trường yêu thích
                    </button>
                </div>
                <div className="profile-card">
                    <div className="profile-avatar-block">
                        <img
                            src={user.avatar || defaultAvatar}
                            alt="avatar"
                            className="profile-avatar"
                        />
                        <label className="profile-avatar-upload">
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
                            />
                            <span>Đổi ảnh</span>
                        </label>
                    </div>
                    <div className="profile-field">
                        <span className="profile-label">Họ tên:</span>
                        <span className="profile-value">{user.name}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-label">Email:</span>
                        <span className="profile-value">{user.email}</span>
                        {user.emailVerified ? (
                            <span className="profile-verified">Đã xác thực</span>
                        ) : (
                            <button className="profile-btn profile-verify-btn" onClick={handleVerifyEmail}>
                                Xác thực email
                            </button>
                        )}
                        <button className="profile-btn" onClick={() => setShowEmailForm(v => !v)}>
                            Cập nhật email
                        </button>
                    </div>
                    {showEmailForm && (
                        <form className="profile-form" onSubmit={handleEmailUpdate}>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                                required
                                placeholder="Nhập email mới"
                            />
                            <button type="submit" className="profile-btn">Lưu email</button>
                        </form>
                    )}
                    <div className="profile-field">
                        <span className="profile-label">Số điện thoại:</span>
                        <span className="profile-value">{user.phone}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-label">Mật khẩu:</span>
                        <span className="profile-value">********</span>
                        <button className="profile-btn" onClick={() => setShowPasswordForm(v => !v)}>
                            Đổi mật khẩu
                        </button>
                    </div>
                    {showPasswordForm && (
                        <form className="profile-form" onSubmit={handlePasswordUpdate}>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                                placeholder="Mật khẩu mới"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Xác nhận mật khẩu"
                            />
                            <button type="submit" className="profile-btn">Lưu mật khẩu</button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
