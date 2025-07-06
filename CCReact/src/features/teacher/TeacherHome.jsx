// // src/components/TeacherHome.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./css/Home.css";
import "../teacher/TeacherHome.css";
function TeacherHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState(null);

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

      axios
        .get("http://localhost:8080/api/courses/my-course", { withCredentials: true })
        .then((res) => setCourse(res.data))
        .catch(() => setCourse(null));
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
          <h4>👨‍🏫 Teacher</h4>
          <hr className="border-light" />
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Course:</strong> {course ? `${course.name} (${course.branch})` : "Not Yet Assigned"}</p>

          <button className="btn btn-info mb-2 w-100" onClick={() => navigate("/teacher/send-notification")}>
            📣 Send Notification
          </button>
          <button className="btn btn-warning mb-2 w-100" onClick={() => navigate("/teacher/recieve-notification")}>
            🔔 View Notifications
          </button>
          <button className="btn btn-primary mb-2 w-100" onClick={() => navigate("/teacher/courses")}>
            📘 My Courses
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
            <p>You can manage assignments, upload notes, and handle course-related activities.</p>
          </div>
          <div className="content-right">{/* Placeholder */}</div>
        </div>
      </div>
    </>
  );
}

export default TeacherHome;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
// import ThemeToggle from "../layout/ThemeToggle";
// import Footer from "../layout/Footer";
// // import "../../css/Theme.css";
// import "../css/Theme.css";

// function TeacherHome() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [course, setCourse] = useState(null);

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

//       axios
//         .get("http://localhost:8080/api/courses/my-course", { withCredentials: true })
//         .then((res) => setCourse(res.data))
//         .catch(() => setCourse(null));
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     navigate("/");
//   };

//   const sidebarItems = [
//     {
//       label: "Send Notification",
//       icon: "📣",
//       onClick: () => navigate("/teacher/send-notification"),
//     },
//     {
//       label: "View Notifications",
//       icon: "🔔",
//       onClick: () => navigate("/teacher/recieve-notification"),
//     },
//     {
//       label: "My Courses",
//       icon: "📘",
//       onClick: () => navigate("/teacher/courses"),
//     },
//   ];

//   return (
//     <>
//       <Navbar />
//       <ThemeToggle />
//       <div className="d-flex">
//         <Sidebar name={name} email={email} role={role} items={sidebarItems} onLogout={handleLogout} />
//         <div className="main-content">
//           <div className="content-left">
//             <h2>👋 Welcome back, {name}!</h2>
//             <p>You can manage assignments, upload notes, and handle your course.</p>
//             {course && (
//               <div className="card mt-3">
//                 <h5>Your Assigned Course:</h5>
//                 <p>{course.name} ({course.branch})</p>
//               </div>
//             )}
//           </div>
//           <div className="content-right">{/* Animation or APIs later */}</div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default TeacherHome;


// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import Navbar from "../../components/layout/Navbar";
// // import ThemeToggle from "../../components/layout/ThemeToggle";
// // import Footer from "../../components/layout/Footer";
// // import "../css/Theme.css";
// // import "../css/DashboardLayout.css";

// // function TeacherHome() {
// //   const navigate = useNavigate();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [role, setRole] = useState("");
// //   const [course, setCourse] = useState(null);

// //   useEffect(() => {
// //     const storedName = localStorage.getItem("username");
// //     const storedEmail = localStorage.getItem("email");
// //     const storedRole = localStorage.getItem("role");

// //     if (!storedName || !storedEmail || storedRole !== "teacher") {
// //       alert("Unauthorized access");
// //       navigate("/");
// //     } else {
// //       setName(storedName);
// //       setEmail(storedEmail);
// //       setRole(storedRole);

// //       axios
// //         .get("http://localhost:8080/api/courses/my-course", { withCredentials: true })
// //         .then((res) => setCourse(res.data))
// //         .catch(() => setCourse(null));
// //     }
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/");
// //   };

// //   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// //   return (
// //     <>
// //       <Navbar />
// //       <ThemeToggle />
// //       <div className="dashboard-wrapper">
// //         <div className={`dashboard-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
// //           <button className="sidebar-toggle" onClick={toggleSidebar}>
// //             {sidebarOpen ? "⬅️" : "➡️"}
// //           </button>
// //           {sidebarOpen && (
// //             <>
// //               <h5>👨‍🏫 Teacher</h5>
// //               <p><strong>{name}</strong></p>
// //               <p>{email}</p>
// //               <button className="btn btn-outline-light w-100 mb-2" onClick={() => navigate("/teacher/send-notification")}>
// //                 📣 Send Notification
// //               </button>
// //               <button className="btn btn-outline-light w-100 mb-2" onClick={() => navigate("/teacher/recieve-notification")}>
// //                 🔔 View Notifications
// //               </button>
// //               <button className="btn btn-outline-light w-100 mb-2" onClick={() => navigate("/teacher/courses")}>
// //                 📘 My Courses
// //               </button>
// //               <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>
// //                 🔓 Logout
// //               </button>
// //             </>
// //           )}
// //         </div>

// //         <div className="dashboard-content">
// //           <h2>👋 Welcome back, {name}!</h2>
// //           <p>You can manage assignments, upload notes, and handle your course.</p>
// //           {course && (
// //             <div className="card mt-3">
// //               <h5>Your Assigned Course:</h5>
// //               <p>{course.name} ({course.branch})</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }

// // export default TeacherHome;
