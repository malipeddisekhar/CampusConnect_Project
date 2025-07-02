import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherNotificationForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [targetAudience, setTargetAudience] = useState("STUDENT"); // Fixed to STUDENT
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const storedName = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (!storedName || !storedRole || storedRole !== "teacher") {
            alert("Unauthorized access");
            navigate("/");
        } else {
            setName(storedName);
            setRole(storedRole);
        }
    }, [navigate]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!title || !message) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/api/notifications/send",
                {
                    title,
                    message,
                    targetAudience, // always STUDENT
                },
                { withCredentials: true }
            );

            console.log(res);
            alert("✅ Notification sent!");
            setTitle("");
            setMessage("");
            navigate("/teacher");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to send notification");
        }
    };

    return (
        <div className="container mt-4">
            <h3>📢 Send Notification to Students</h3>
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
                <button type="submit" className="btn btn-primary w-100 mb-2">
                    🚀 Send Notification
                </button>
            </form>
            <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/teacher")}
            >
                🔙 Back to Teacher Dashboard
            </button>
        </div>
    );
}

export default TeacherNotificationForm;