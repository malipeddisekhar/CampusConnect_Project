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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../layout/Navbar";
// import ThemeToggle from "../layout/ThemeToggle";
// import Sidebar from "../layout/Sidebar";
// import Footer from "../layout/Footer";
// // import "../../css/Theme.css";
// // import "./css/Theme.css";
// import "../css/Theme.css";

// function NotificationForm() {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState("");
//     const [message, setMessage] = useState("");
//     const [targetAudience, setTargetAudience] = useState("STUDENT");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");

//     useEffect(() => {
//         const storedName = localStorage.getItem("username");
//         const storedEmail = localStorage.getItem("email");
//         const storedRole = localStorage.getItem("role");

//         if (!storedName || !storedEmail || storedRole !== "admin") {
//             alert("Unauthorized access");
//             navigate("/");
//         } else {
//             setName(storedName);
//             setEmail(storedEmail);
//             setRole(storedRole);
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title || !message || !targetAudience) {
//             alert("All fields are required.");
//             return;
//         }

//         try {
//             const res = await fetch("http://localhost:8080/api/notifications/send", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title, message, targetAudience }),
//             });

//             if (!res.ok) throw new Error("Failed to send notification");
//             alert("✅ Notification sent!");
//             setTitle("");
//             setMessage("");
//         } catch (err) {
//             alert("❌ Failed to send notification");
//             console.error(err);
//         }
//     };

//     const sidebarItems = [
//         {
//             label: "Manage Courses",
//             icon: "📘",
//             onClick: () => navigate("/admin/manage-courses"),
//         },
//         {
//             label: "Back to Dashboard",
//             icon: "⬅️",
//             onClick: () => navigate("/admin"),
//         },
//     ];

//     return (
//         <>
//             <Navbar />
//             <ThemeToggle />
//             <div className="d-flex">
//                 <Sidebar name={name} email={email} role={role} items={sidebarItems} onLogout={() => {
//                     localStorage.clear();
//                     navigate("/");
//                 }} />
//                 <div className="main-content container py-4">
//                     <h3>📢 Send Notification</h3>
//                     <form onSubmit={handleSubmit} className="mt-4">
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

//                         <div className="mb-3">
//                             <label className="form-label">Target Audience</label>
//                             <select
//                                 className="form-select"
//                                 value={targetAudience}
//                                 onChange={(e) => setTargetAudience(e.target.value)}
//                             >
//                                 <option value="STUDENT">Students</option>
//                                 <option value="TEACHER">Teachers</option>
//                                 <option value="ALL">All Users</option>
//                             </select>
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

// export default NotificationForm;
