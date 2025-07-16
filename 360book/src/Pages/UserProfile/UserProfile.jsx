import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./UserProfile.css";

const defaultAvatar = "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=ffecb3&color=2d3a8c&size=128";

const mockUser = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    emailVerified: false,
    phone: "0912345678",
    avatar: "",
    favoriteUniversities: [
        "Đại học Bách Khoa Hà Nội",
        "Đại học Kinh tế Quốc dân",
        "Đại học Ngoại thương"
    ]
};

export default function UserProfile() {
    const [user, setUser] = useState(mockUser);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);

    const handleEmailUpdate = e => {
        e.preventDefault();
        setUser({ ...user, email: newEmail, emailVerified: false });
        setShowEmailForm(false);
        // TODO: Gọi API update email
    };

    const handlePasswordUpdate = e => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        setShowPasswordForm(false);
        setNewPassword("");
        setConfirmPassword("");
        // TODO: Gọi API update password
    };

    const handleVerifyEmail = () => {
        alert("Đã gửi email xác thực đến " + user.email + "! (Giả lập)");
        // TODO: Gọi API gửi xác thực email
    };

    const handleRemoveFavorite = idx => {
        setUser({
            ...user,
            favoriteUniversities: user.favoriteUniversities.filter((_, i) => i !== idx)
        });
        // TODO: Gọi API xóa trường yêu thích
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
            // TODO: Gọi API upload avatar
        }
    };

    return (
        <>
            <Navbar />
            <div className="user-profile-page">
                <h1 className="profile-title">Thông tin cá nhân</h1>
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
                    <div className="profile-field">
                        <span className="profile-label">Trường yêu thích:</span>
                        <div className="profile-favorites">
                            {user.favoriteUniversities.length === 0 && <span className="profile-fav-tag">Chưa có trường nào</span>}
                            {user.favoriteUniversities.map((uni, idx) => (
                                <span className="profile-fav-tag" key={idx}>
                                    {uni}
                                    <button
                                        className="profile-fav-remove"
                                        title="Xóa trường này"
                                        onClick={() => handleRemoveFavorite(idx)}
                                        type="button"
                                    >×</button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
