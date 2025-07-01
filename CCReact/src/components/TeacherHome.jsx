// // /* eslint-disable react-hooks/exhaustive-deps */
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // // import Navbar from "./Navbar";
// // // import Footer from "./Footer";

// // function TeacherHome() {
// //   const navigate = useNavigate();
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [role, setRole] = useState("");

// //   useEffect(() => {
// //     const storedName = localStorage.getItem("username");
// //     const storedEmail = localStorage.getItem("email");
// //     const storedRole = localStorage.getItem("role");

// //     if (!storedName || !storedEmail) {
// //       alert("User not logged in");
// //       navigate("/");
// //     } else {
// //       setName(storedName);
// //       setEmail(storedEmail);
// //       setRole(storedRole);
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     alert("You have been logged out.");
// //     navigate("/");
// //   };

// //   const goToNotifications = () => {
// //     navigate("/teacher/recieve-notification");
// //   };

// //   return (
// //     <>
// //       {/* <Navbar /> */}
// //       <div className="container mt-5">
// //         <h2>👨‍🏫 Teacher Dashboard</h2>
// //         <h4>👋 Hello, {name}</h4>
// //         <p>📧 Email: {email}</p>
// //         <p>🧑‍💼 Role: {role}</p>
// //         <p>Welcome! You can create tasks, upload notes, and manage attendance.</p>

// //         <button className="btn btn-info mt-3" onClick={goToNotifications}>
// //           🔔 View Notifications
// //         </button>

// //         <div
// //           style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}
// //         >
// //           <button className="btn btn-outline-danger" onClick={handleLogout}>
// //             🔓 Logout
// //           </button>
// //         </div>
// //       </div>
// //       {/* <Footer /> */}
// //     </>
// //   );
// // }

// // export default TeacherHome;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./css/Home.css"; // Make sure Home.css exists in components/css

// function TeacherHome() {
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
//     alert("You have been logged out.");
//     navigate("/");
//   };

//   const goToNotifications = () => {
//     navigate("/teacher/recieve-notification");
//   };

//   const goToNotificationForm = () => {
//     navigate("/teacher/send-notification");
//   };

//   return (
//     <div className="home-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
//         <h4 className="sidebar-heading">👨‍🏫 Teacher</h4>
//         <hr />
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Email:</strong> {email}</p>
//         <p><strong>Role:</strong> {role}</p>
//         <button className="btn btn-outline-danger mt-3 w-100" onClick={handleLogout}>
//           🔓 Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Toggler */}
//         <button
//           className="sidebar-toggle"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           {sidebarOpen ? "⬅️" : "➡️"}
//         </button>

//         <div className="content-left">
//           <h2>👋 Welcome back, Teacher!</h2>
//           <p>You can create tasks, upload notes, manage attendance, and notify students.</p>

//           <div className="mt-4">
//             <button className="btn btn-primary me-2" onClick={goToNotificationForm}>
//               📣 Send Notification
//             </button>
//             <button className="btn btn-info" onClick={goToNotifications}>
//               🔔 View Notifications
//             </button>
//           </div>
//         </div>

//         <div className="content-right">
//           {/* Placeholder for animation */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeacherHome;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css"; // Ensure this path is correct

function TeacherHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    navigate("/");
  };

  const goToNotificationForm = () => {
    navigate("/teacher/send-notification");
  };

  const goToNotifications = () => {
    navigate("/teacher/recieve-notification");
  };

  const goToCourses = () => {
    navigate("/teacher/courses");
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <h4 className="sidebar-heading">👨‍🏫 Teacher</h4>
        <hr />
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
        <button className="btn btn-outline-danger mt-3 w-100" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Toggler */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "⬅️" : "➡️"}
        </button>

        <div className="content-left">
          <h2>👋 Welcome back, Teacher!</h2>
          <p>You can manage assignments, send notifications, and view your courses.</p>

          <div className="mt-4">
            <button className="btn btn-primary me-2" onClick={goToNotificationForm}>
              📣 Send Notification
            </button>
            <button className="btn btn-info me-2" onClick={goToNotifications}>
              🔔 View Notifications
            </button>
            <button className="btn btn-secondary" onClick={goToCourses}>
              📘 My Courses
            </button>
          </div>
        </div>

        <div className="content-right">
          {/* Reserved for animation or future components */}
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
