import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VerifyInfo.css";

const VerifyInfo = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [note, setNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get("/api/user-qa");
        setPendingUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNote("");
    setStatusMessage("");
  };

  const handleVerification = async (status) => {
    if (!selectedUser) return;
    try {
      await axios.post("/api/user-verification", {
        userId: selectedUser.id,
        status: status,
        note: note,
      });

      setStatusMessage(`User ${status === "approved" ? "approved" : "rejected"} successfully.`);
      setPendingUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
    } catch (error) {
      console.error("Verification failed:", error);
      setStatusMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div className="verify-wrapper">
      <h2 className="page-title">Pending Verifications</h2>
      <div className="verify-panel">
        <div className="verify-sidebar">
          <h3>Users</h3>
          <ul className="user-list">
            {pendingUsers.length === 0 && <p>No pending verifications</p>}
            {pendingUsers.map((user) => (
              <li
                key={user.id}
                className={selectedUser?.id === user.id ? "active" : ""}
                onClick={() => handleSelectUser(user)}
              >
                <strong>{user.name}</strong>
                <br />
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="verify-details">
          {selectedUser ? (
            <div className="details-card">
              <h3>Review Information</h3>
              <div className="info-row"><strong>Name:</strong> {selectedUser.name}</div>
              <div className="info-row"><strong>Email:</strong> {selectedUser.email}</div>
              <div className="info-row"><strong>ID Document:</strong> {selectedUser.idDocument}</div>
              <div className="info-row"><strong>Info:</strong> {selectedUser.info}</div>

              <textarea
                placeholder="Optional note (e.g. reason for rejection)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <div className="btn-group">
                <button className="btn-approve" onClick={() => handleVerification("approved")}>
                  Approve
                </button>
                <button className="btn-reject" onClick={() => handleVerification("rejected")}>
                  Reject
                </button>
              </div>

              {statusMessage && <p className="status-msg">{statusMessage}</p>}
            </div>
          ) : (
            <div className="empty-card">
              <p>Select a user from the list to review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyInfo;
