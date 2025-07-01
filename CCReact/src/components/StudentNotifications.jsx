// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function StudentNotifications() {
//     const [notifications, setNotifications] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     const fetchNotifications = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:8080/api/notifications?role=STUDENT"
//             );
//             setNotifications(res.data);
//         } catch (err) {
//             console.error("Error fetching notifications:", err);
//             alert("Failed to load notifications.");
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h2>📩 Student Notifications</h2>
//             {notifications.length === 0 ? (
//                 <p>No notifications found.</p>
//             ) : (
//                 <table className="table table-bordered mt-3">
//                     <thead>
//                         <tr>
//                             <th>📌 Title</th>
//                             <th>📝 Message</th>
//                             <th>📅 Sent At</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {notifications.map((n) => (
//                             <tr key={n.id}>
//                                 <td>{n.title}</td>
//                                 <td>{n.message}</td>
//                                 <td>{n.createdAt.replace("T", " ").split(".")[0]}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             <button className="btn btn-secondary mt-4" onClick={() => navigate("/student")}>
//                 ⬅️ Back to Dashboard
//             </button>
//         </div>
//     );
// }

// export default StudentNotifications;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentNotifications() {
    const [notificationsBySender, setNotificationsBySender] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/notifications?role=STUDENT");
            const grouped = {};

            res.data.forEach((n) => {
                const senderName = n.sender?.name || "Unknown";
                const senderRole = n.sender?.role || "";
                const label = `${senderRole === "ADMIN" ? "👑 Admin" : "👨‍🏫 Teacher"} ${senderName}`;

                if (!grouped[label]) grouped[label] = [];
                grouped[label].push(n);
            });

            setNotificationsBySender(grouped);
        } catch (err) {
            console.error("Error fetching notifications:", err);
            alert("Failed to load notifications.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>📩 Student Notifications</h2>
            {Object.keys(notificationsBySender).length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                Object.entries(notificationsBySender).map(([senderLabel, list]) => (
                    <div key={senderLabel} className="mb-4">
                        <h5 className="bg-light p-2 rounded">🔔 {senderLabel}</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>📌 Title</th>
                                    <th>📝 Message</th>
                                    <th>📅 Sent At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((n) => (
                                    <tr key={n.id}>
                                        <td>{n.title}</td>
                                        <td>{n.message}</td>
                                        <td>{n.createdAt.replace("T", " ").split(".")[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}

            <button className="btn btn-secondary mt-4" onClick={() => navigate("/student")}>⬅️ Back to Dashboard</button>
        </div>
    );
}

export default StudentNotifications;
