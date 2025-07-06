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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/layout/Navbar";
// import ThemeToggle from "../../components/layout/ThemeToggle";
// import Sidebar from "../../components/layout/Sidebar";
// import Footer from "../../components/layout/Footer";
// // import "../../css/Theme.css";
// import "../css/Theme.css";

// function TeacherNotificationForm() {
//     const [title, setTitle] = useState("");
//     const [message, setMessage] = useState("");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedName = localStorage.getItem("username");
//         const storedEmail = localStorage.getItem("email");
//         const storedRole = localStorage.getItem("role");

//         if (!storedName || !storedRole || storedRole !== "teacher") {
//             alert("Unauthorized access");
//             navigate("/");
//         } else {
//             setName(storedName);
//             setEmail(storedEmail);
//             setRole(storedRole);
//         }
//     }, [navigate]);

//     const handleSend = async (e) => {
//         e.preventDefault();
//         if (!title || !message) {
//             alert("All fields are required");
//             return;
//         }

//         try {
//             const res = await fetch("http://localhost:8080/api/notifications/send", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     title,
//                     message,
//                     targetAudience: "STUDENT",
//                 }),
//             });

//             if (!res.ok) throw new Error("Request failed");
//             alert("✅ Notification sent!");
//             setTitle("");
//             setMessage("");
//             navigate("/teacher");
//         } catch (err) {
//             console.error(err);
//             alert("❌ Failed to send notification");
//         }
//     };

//     const sidebarItems = [
//         {
//             label: "My Courses",
//             icon: "📘",
//             onClick: () => navigate("/teacher/courses"),
//         },
//         {
//             label: "View Notifications",
//             icon: "🔔",
//             onClick: () => navigate("/teacher/recieve-notification"),
//         },
//         {
//             label: "Back to Dashboard",
//             icon: "⬅️",
//             onClick: () => navigate("/teacher"),
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
//                     <h3>📢 Send Notification to Students</h3>
//                     <form onSubmit={handleSend} className="mt-4">
//                         <div className="mb-3">
//                             <label className="form-label">Title</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Message</label>
//                             <textarea
//                                 className="form-control"
//                                 rows="4"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary w-100">
//                             🚀 Send Notification
//                         </button>
//                     </form>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default TeacherNotificationForm;
