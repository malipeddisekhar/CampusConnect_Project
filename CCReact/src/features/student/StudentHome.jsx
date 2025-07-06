// src/components/StudentHome.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./css/Home.css";
import "../student/StudentHome.css";

function StudentHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [courses, setCourses] = useState([]);

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
        .get("http://localhost:8080/api/student/my-courses", {
          withCredentials: true,
        })
        .then((res) => setCourses(res.data))
        .catch(() => setCourses([]));
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

  const goToNotifications = () => {
    navigate("/student/recieve-notification");
  };

  const goToProfile = () => {
    navigate("/student/profile");
  };

  return (
    <>
      <div className="home-container bg-dark text-light">
        <div className={`custom-sidebar ${sidebarOpen ? "open" : ""}`} ref={sidebarRef}>
          <h4>🎓 Student</h4>
          <hr className="border-light" />
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Role:</strong> {role}</p>
          <div>
            <strong>Courses:</strong>
            {courses.length > 0 ? (
              <ul className="ps-3">
                {courses.map((c) => (
                  <li key={c.id}>
                    {c.name} ({c.branch})
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not Yet Assigned</p>
            )}
          </div>
          <button className="btn btn-warning mb-2 w-100" onClick={goToProfile}>
            📄 Edit Profile
          </button>
          <button className="btn btn-info mb-2 w-100" onClick={goToNotifications}>
            🔔 View Notifications
          </button>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>

        {!sidebarOpen && (
          <button
            className="sidebar-toggle-btn btn btn-outline-light"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        )}

        <div className="main-content">
          <div className="content-left">
            <h2>👋 Welcome back, {name}!</h2>
            <p>You can view tasks, submit work, and check notifications.</p>
          </div>
          <div className="content-right">{/* Optional animation */}</div>
        </div>
      </div>
    </>
  );
}

export default StudentHome;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
// import ThemeToggle from "../layout/ThemeToggle";
// import Footer from "../layout/Footer";
// // import "../../css/Theme.css";
// // import "./css/Theme.css";
// import "../css/Theme.css";


// function StudentHome() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [courses, setCourses] = useState([]);

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
//         .get("http://localhost:8080/api/student/my-courses", {
//           withCredentials: true,
//         })
//         .then((res) => setCourses(res.data))
//         .catch(() => setCourses([]));
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     navigate("/");
//   };

//   const sidebarItems = [
//     {
//       label: "Edit Profile",
//       icon: "📄",
//       onClick: () => navigate("/student/profile"),
//     },
//     {
//       label: "View Notifications",
//       icon: "🔔",
//       onClick: () => navigate("/student/recieve-notification"),
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
//             <p>You can view tasks, submit work, and check notifications.</p>
//             <div className="card mt-3">
//               <h5>Your Courses:</h5>
//               {courses.length > 0 ? (
//                 <ul className="ps-3">
//                   {courses.map((c) => (
//                     <li key={c.id}>{c.name} ({c.branch})</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>Not Yet Assigned</p>
//               )}
//             </div>
//           </div>
//           <div className="content-right">{/* Animation or APIs later */}</div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default StudentHome;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../../components/layout/Navbar";
// import ThemeToggle from "../../components/layout/ThemeToggle";
// import Footer from "../../components/layout/Footer";
// import "../css/Theme.css";
// import "../css/DashboardLayout.css";

// function StudentHome() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const storedName = localStorage.getItem("username");
//     const storedEmail = localStorage.getItem("email");
//     const storedRole = localStorage.getItem("role");

//     if (!storedName || !storedEmail || storedRole !== "student") {
//       alert("Unauthorized access");
//       navigate("/");
//     } else {
//       setName(storedName);
//       setEmail(storedEmail);
//       setRole(storedRole);

//       axios
//         .get("http://localhost:8080/api/student/my-courses", {
//           withCredentials: true,
//         })
//         .then((res) => setCourses(res.data))
//         .catch(() => setCourses([]));
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <>
//       <Navbar />
//       <ThemeToggle />
//       <div className="dashboard-wrapper">
//         <div className={`dashboard-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
//           <button className="sidebar-toggle" onClick={toggleSidebar}>
//             {sidebarOpen ? "⬅️" : "➡️"}
//           </button>
//           {sidebarOpen && (
//             <>
//               <h5>🎓 Student</h5>
//               <p><strong>{name}</strong></p>
//               <p>{email}</p>
//               <button className="btn btn-outline-light w-100 mb-2" onClick={() => navigate("/student/profile")}>
//                 📄 Edit Profile
//               </button>
//               <button className="btn btn-outline-light w-100 mb-2" onClick={() => navigate("/student/recieve-notification")}>
//                 🔔 View Notifications
//               </button>
//               <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>
//                 🔓 Logout
//               </button>
//             </>
//           )}
//         </div>

//         <div className="dashboard-content">
//           <h2>👋 Welcome back, {name}!</h2>
//           <p>You can view tasks, submit work, and check notifications.</p>
//           <div className="card mt-3">
//             <h5>Your Courses:</h5>
//             {courses.length > 0 ? (
//               <ul className="ps-3">
//                 {courses.map((c) => (
//                   <li key={c.id}>{c.name} ({c.branch})</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Not Yet Assigned</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default StudentHome;
