import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NotificationForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [targetAudience, setTargetAudience] = useState("ALL");
    const navigate = useNavigate();

    const handleSend = async (e) => {
        e.preventDefault();
        if (!title || !message || !targetAudience) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/api/notifications/send",
                {
                    title,
                    message,
                    targetAudience,
                },
                { withCredentials: true }
            );

            console.log(res);
            alert("✅ Notification sent!");
            // Reset form
            setTitle("");
            setMessage("");
            setTargetAudience("ALL");
            // Navigate back to admin dashboard
            navigate("/admin");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to send notification");
        }
    };
    return (

        <div className="container mt-4"> <h3>📢 Send Notification</h3>
            {/* php-template */}
            {/* Copy */}
            {/* Edit */}

            {/* Live preview */}
            <div className="card mb-4 p-3 bg-light shadow-sm">
                <h5 className="text-muted">Live Preview:</h5>
                <p><strong>Title:</strong> {title || "—"}</p>
                <p><strong>Message:</strong> {message || "—"}</p>
                <p><strong>Target:</strong> {targetAudience || "—"}</p>
            </div>

            <form onSubmit={handleSend}>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Notification Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Notification Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                />
                <select
                    className="form-select mb-3"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="TEACHER">Only Teachers</option>
                    <option value="STUDENT">Only Students</option>
                </select>
                <button type="submit" className="btn btn-primary w-100 mb-2">
                    🚀 Send Notification
                </button>
            </form>

            <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/admin")}
            >
                🔙 Back to Admin Dashboard
            </button>
        </div>
    );
}

export default NotificationForm;