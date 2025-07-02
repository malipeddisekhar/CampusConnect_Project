

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./css/Home.css";

// function StudentHome() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
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

//   const goToNotifications = () => {
//     navigate("/student/recieve-notification");
//   };

//   return (
//     <div className="home-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
//         <h4 className="sidebar-heading">🎓 Student</h4>
//         <hr />
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Email:</strong> {email}</p>
//         <p><strong>Role:</strong> {role}</p>
//         <p>
//           <strong>Course:</strong>{" "}
//           {course ? `${course.name} (${course.branch})` : "Not Yet Assigned"}
//         </p>
//         <button className="btn btn-outline-danger mt-3 w-100" onClick={handleLogout}>
//           🔓 Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
//           {sidebarOpen ? "⬅️" : "➡️"}
//         </button>

//         <div className="content-left">
//           <h2>👋 Welcome back, Student!</h2>
//           <p>You can view tasks, submit work, and check notifications.</p>
//           <button className="btn btn-info mt-3" onClick={goToNotifications}>
//             🔔 View Notifications
//           </button>
//         </div>

//         <div className="content-right">{/* Animation Placeholder */}</div>
//       </div>
//     </div>
//   );
// }

// export default StudentHome;


// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./css/Home.css";

// function StudentHome() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [course, setCourse] = useState(null);
//   const sidebarRef = useRef();

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
//         .get("http://localhost:8080/api/courses/my-course", {
//           withCredentials: true,
//         })
//         .then((res) => setCourse(res.data))
//         .catch(() => setCourse(null));
//     }

//     // Close sidebar on outside click
//     const handleOutsideClick = (e) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//         setSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     navigate("/");
//   };

//   const goToNotifications = () => {
//     navigate("/student/recieve-notification");
//   };

//   const goToProfile = () => {
//     navigate("/student/profile");
//   };

//   return (
//     <div className="home-container bg-dark text-light">
//       {/* Sidebar */}
//       <div
//         className={`custom-sidebar ${sidebarOpen ? "open" : ""}`}
//         ref={sidebarRef}
//       >
//         <h4>🎓 Student</h4>
//         <hr className="border-light" />
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Email:</strong> {email}</p>
//         <p><strong>Role:</strong> {role}</p>
//         <p>
//           <strong>Course:</strong>{" "}
//           {course ? `${course.name} (${course.branch})` : "Not Yet Assigned"}
//         </p>
//         <button className="btn btn-warning mb-2" onClick={goToProfile}>
//           📄 Edit Profile
//         </button>
//         <button className="btn btn-danger" onClick={handleLogout}>
//           🔓 Logout
//         </button>
//       </div>

//       {/* Toggle Button */}
//       <button
//         className="sidebar-toggle-btn btn btn-light"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? "❌" : "☰"}
//       </button>

//       {/* Main Content */}
//       <div className="main-content container">
//         <h2>👋 Welcome back, Student!</h2>
//         <p>You can view tasks, submit work, and check notifications.</p>
//         <button className="btn btn-info mt-3" onClick={goToNotifications}>
//           🔔 View Notifications
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StudentHome;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";

function StudentHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        .get("http://localhost:8080/api/courses/my-course", {
          withCredentials: true,
        })
        .then((res) => setCourse(res.data))
        .catch(() => setCourse(null));
    }
  }, [navigate]);

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
    <div className="home-container bg-dark text-light">
      {/* Sidebar */}
      <div className={`custom-sidebar ${sidebarOpen ? "open" : ""}`}>
      <hr className="border-light" />
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
      <p>
        <strong>Course:</strong>{" "}
        {course ? `${course.name} (${course.branch})` : "Not Yet Assigned"}

      </p>
      <button className="btn btn-warning mb-2 w-100" onClick={goToProfile}>
        📄 Edit Profile
      </button>
      <button className="btn btn-danger w-100" onClick={handleLogout}>
        🔓 Logout
      </button>
      {/* Hide close button inside sidebar */}
      <button
        className="btn btn-sm btn-outline-light mt-3 w-100"
        onClick={() => setSidebarOpen(false)}
      >
        ❌ Close Sidebar
      </button>
    </div>
  {/* Toggle Button (Top left corner, outside sidebar) */ }
  {
    !sidebarOpen && (
      <button
        className="sidebar-toggle-btn btn btn-primary"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>
    )
  }

  {/* Main Content */ }
  <div className="main-content">
    <div className="content-left">
      <h2>👋 Welcome back, Student!</h2>
      <p>You can view tasks, submit work, and check notifications.</p>
      <button className="btn btn-info mt-3" onClick={goToNotifications}>
        🔔 View Notifications
      </button>
    </div>
    <div className="content-right">{/* Optional animation placeholder */}</div>
  </div>
</div >
);
}

export default StudentHome;