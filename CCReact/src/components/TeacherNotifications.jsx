import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherNotifications() {
    const [notificationsBySender, setNotificationsBySender] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/notifications?role=TEACHER");
            const grouped = {};

            res.data.forEach((n) => {
                const sender = n.sender?.name || "Unknown";
                const role = n.sender?.role || "UNKNOWN";
                const key = `${role}_${sender}`;
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(n);
            });

            setNotificationsBySender(grouped);
        } catch (err) {
            console.error("Error fetching notifications:", err);
            alert("Failed to load notifications.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>📩 Teacher Notifications</h2>
            {Object.keys(notificationsBySender).length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                Object.entries(notificationsBySender).map(([key, notifs]) => {
                    const [role, name] = key.split("_");
                    return (
                        <div key={key} className="mb-4">
                            <h5 className="mt-4">
                                🔔 {role === "ADMIN" ? "👑 Admin" : "👨‍🏫 Teacher"} {name}
                            </h5>
                            <table className="table table-bordered mt-2">
                                <thead>
                                    <tr>
                                        <th>📌 Title</th>
                                        <th>📝 Message</th>
                                        <th>📅 Sent At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notifs.map((n) => (
                                        <tr key={n.id}>
                                            <td>{n.title}</td>
                                            <td>{n.message}</td>
                                            <td>{n.createdAt.replace("T", " ").split(".")[0]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })
            )}

            <button className="btn btn-secondary mt-4" onClick={() => navigate("/teacher")}>⬅️ Back to Dashboard</button>
        </div>
    );
}

export default TeacherNotifications;
