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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/layout/Navbar";
// import Sidebar from "../../components/layout/Sidebar";
// import ThemeToggle from "../../components/layout/ThemeToggle";
// import Footer from "../../components/layout/Footer";
// // import "../../css/Theme.css";
// import "../css/Theme.css";

// function StudentNotifications() {
//     const [notificationsBySender, setNotificationsBySender] = useState({});
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedName = localStorage.getItem("username");
//         const storedEmail = localStorage.getItem("email");
//         const storedRole = localStorage.getItem("role");

//         if (!storedName || !storedEmail || storedRole !== "student") {
//             alert("Unauthorized access");
//             navigate("/");
//         } else {
//             setName(storedName);
//             setEmail(storedEmail);
//             setRole(storedRole);
//             fetchNotifications();
//         }
//     }, [navigate]);

//     const fetchNotifications = async () => {
//         try {
//             const res = await fetch("http://localhost:8080/api/notifications?role=STUDENT", {
//                 credentials: "include",
//             });
//             const data = await res.json();

//             const grouped = {};
//             data.forEach((n) => {
//                 const sender = n.sender?.name || "Unknown";
//                 const senderRole = n.sender?.role || "UNKNOWN";
//                 const key = `${senderRole}_${sender}`;

//                 if (!grouped[key]) grouped[key] = [];
//                 grouped[key].push(n);
//             });

//             setNotificationsBySender(grouped);
//         } catch (err) {
//             console.error("Error loading notifications:", err);
//             alert("Failed to fetch notifications");
//         }
//     };

//     const sidebarItems = [
//         {
//             label: "Back to Dashboard",
//             icon: "⬅️",
//             onClick: () => navigate("/student"),
//         },
//     ];

//     return (
//         <>
//             <Navbar />
//             <ThemeToggle />
//             <div className="d-flex">
//                 <Sidebar
//                     name={name}
//                     email={email}
//                     role={role}
//                     items={sidebarItems}
//                     onLogout={() => {
//                         localStorage.clear();
//                         navigate("/");
//                     }}
//                 />
//                 <div className="main-content container py-4">
//                     <h3>🔔 Notifications</h3>

//                     {Object.keys(notificationsBySender).length === 0 ? (
//                         <p>No notifications available.</p>
//                     ) : (
//                         Object.entries(notificationsBySender).map(([key, notifs]) => {
//                             const [senderRole, senderName] = key.split("_");
//                             return (
//                                 <div key={key} className="mb-4">
//                                     <h5 className="mt-4">
//                                         {senderRole === "ADMIN" ? "👑 Admin" : "👨‍🏫 Teacher"} {senderName}
//                                     </h5>
//                                     <table className="table table-bordered mt-2">
//                                         <thead>
//                                             <tr>
//                                                 <th>📌 Title</th>
//                                                 <th>📝 Message</th>
//                                                 <th>📅 Sent At</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {notifs.map((n) => (
//                                                 <tr key={n.id}>
//                                                     <td>{n.title}</td>
//                                                     <td>{n.message}</td>
//                                                     <td>{n.createdAt.replace("T", " ").split(".")[0]}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             );
//                         })
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default StudentNotifications;
