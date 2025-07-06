import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import "./css/Home.css";
import "../admin/AdminHome.css";


function AdminHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");

    if (!storedName || !storedEmail) {
      alert("User not logged in");
      navigate("/");
    } else {
      setName(storedName);
      setEmail(storedEmail);
      setRole(storedRole);
    }

    const handleClickOutside = (e) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate, sidebarOpen]);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <>
      <div className="home-container bg-dark text-light">
        <div className={`custom-sidebar ${sidebarOpen ? "open" : ""}`} ref={sidebarRef}>
          <h4>👑 Admin</h4>
          <hr className="border-light" />
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Role:</strong> {role}</p>

          <button className="btn btn-primary mb-2 w-100" onClick={() => navigate("/admin/manage-courses")}>
            📘 Manage Courses
          </button>
          <button className="btn btn-info mb-2 w-100" onClick={() => navigate("/admin/send-notification")}>
            📣 Send Notification
          </button>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>

        {!sidebarOpen && (
          <button className="sidebar-toggle-btn btn btn-outline-light" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        )}

        <div className="main-content">
          <div className="content-left">
            <h2>👋 Welcome back, {name}!</h2>
            <p>You can manage users, assign roles, view system analytics, and more.</p>
          </div>
          <div className="content-right">{/* Placeholder */}</div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../layout/DashboardLayout";

// function AdminHome() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("username");
//     const storedEmail = localStorage.getItem("email");
//     const storedRole = localStorage.getItem("role");

//     if (!storedName || !storedEmail) {
//       alert("User not logged in");
//       navigate("/");
//     } else {
//       setName(storedName);
//       setEmail(storedEmail);
//       setRole(storedRole);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     navigate("/");
//   };

//   const sidebarItems = [
//     {
//       label: "Manage Courses",
//       icon: "📘",
//       onClick: () => navigate("/admin/manage-courses"),
//     },
//     {
//       label: "Send Notification",
//       icon: "📣",
//       onClick: () => navigate("/admin/send-notification"),
//     },
//   ];

//   return (
//     <DashboardLayout
//       name={name}
//       email={email}
//       role={role}
//       sidebarItems={sidebarItems}
//       onLogout={handleLogout}
//     >
//       <h2>👋 Welcome back, {name}!</h2>
//       <p>You can manage users, assign roles, and view system analytics.</p>
//     </DashboardLayout>
//   );
// }

// export default AdminHome;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/layout/Navbar";
// import Footer from "../../components/layout/Footer";
// import "./AdminDashboard.css";

// function AdminHome() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("username");
//     const storedEmail = localStorage.getItem("email");
//     const storedRole = localStorage.getItem("role");

//     if (!storedName || !storedEmail) {
//       alert("User not logged in");
//       navigate("/");
//     } else {
//       setName(storedName);
//       setEmail(storedEmail);
//       setRole(storedRole);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("Logged out");
//     navigate("/");
//   };

//   return (
//     <>
//       <Navbar />

//       <button
//         className="sidebar-toggle-btn"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? "☰" : "☰"}
//       </button>

//       <button
//         className="btn btn-sm btn-dark theme-toggle-btn"
//         onClick={() => document.body.classList.toggle("dark")}
//       >
//         🌓 Toggle Theme
//       </button>

//       <div className="admin-dashboard">
//         {sidebarOpen && (
//           <div className="sidebar">
//             <h5>👑 Admin</h5>
//             <hr />
//             <p><strong>Name:</strong> {name}</p>
//             <p><strong>Email:</strong> {email}</p>
//             <p><strong>Role:</strong> {role}</p>
//             <button className="btn btn-danger mt-3 w-100" onClick={handleLogout}>
//               🔓 Logout
//             </button>
//           </div>
//         )}

//         <div className="main-content">
//           <h2>👋 Welcome, {name}!</h2>
//           <div
//             className="admin-card"
//             onClick={() => navigate("/admin/manage-courses")}
//           >
//             📘 <strong>Manage Courses</strong>
//             <p>Create courses, assign teachers & enroll students.</p>
//           </div>

//           <div
//             className="admin-card"
//             onClick={() => navigate("/admin/send-notification")}
//           >
//             📢 <strong>Send Notification</strong>
//             <p>Broadcast messages to students and teachers.</p>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default AdminHome;
