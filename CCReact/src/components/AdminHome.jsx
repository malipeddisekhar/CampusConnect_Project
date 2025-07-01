// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import Navbar from "./Navbar";
// // import Footer from "./Footer";

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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     navigate("/");
//   };

//   const goToNotificationForm = () => {
//     navigate("/admin/send-notification");
//   };

//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="container mt-5">
//         <h2>👑 Admin Dashboard</h2>
//         <h4>👋 Hello, {name}</h4>
//         <p>📧 Email: {email}</p>
//         <p>🧑‍💼 Role: {role}</p>
//         <p>You have access to manage users, courses, and system data.</p>

//         {/* Send Notification Button */}
//         <div className="mt-4">
//           <button className="btn btn-primary" onClick={goToNotificationForm}>
//             📣 Send Notification
//           </button>
//         </div>

//         {/* Logout Button Floating */}
//         <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             🔓 Logout
//           </button>
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default AdminHome;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css"; // ✅ Import the shared CSS

function AdminHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true); // 🔀 toggle state
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
    navigate("/admin/send-notification");
  };

  return (
    <div className="home-container">
      {/* ✅ Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <h4 className="sidebar-heading">👑 Admin</h4>
        <hr />
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
        <button className="btn btn-outline-danger mt-3 w-100" onClick={handleLogout}>
          🔓 Logout
        </button>
        <button
          className="btn btn-outline-primary mt-2 w-100"
          onClick={() => navigate("/admin/manage-courses")}
        >
          📘 Manage Courses
        </button>

      </div>

      {/* ✅ Main Content */}
      <div className="main-content">
        {/* 🔘 Toggler */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "⬅️" : "➡️"}
        </button>

        <div className="content-left">
          <h2>👋 Welcome back,  {name}!</h2>
          <p>You can manage users, assign roles, view system analytics, and more.</p>

          <div className="mt-4">
            <button className="btn btn-primary" onClick={goToNotificationForm}>
              📣 Send Notification
            </button>
          </div>
        </div>

        <div className="content-right">
          {/* Placeholder for future animation */}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;