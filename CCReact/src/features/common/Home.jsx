// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//     const [toggleSidebar, setToggleSidebar] = useState(false);
//     const [darkTheme, setDarkTheme] = useState(false);
//     const navigate = useNavigate();

//     const handleSidebarToggle = () => {
//         setToggleSidebar(!toggleSidebar);
//     };

//     const handleThemeToggle = () => {
//         setDarkTheme(!darkTheme);
//     };

//     const handleLogout = () => {
//         console.log("User logged out.");
//         // localStorage.clear(); // optionally clear session
//         navigate("/");
//     };

//     return (
//         <div className={`home-container ${darkTheme ? "dark-theme" : "light-theme"}`}>

//             {/* Sidebar */}
//             <div className={`sidebar ${toggleSidebar ? "active" : ""}`}>
//                 <ul>
//                     <li><Link to="/home">🏠 Home</Link></li>
//                     <li><Link to="/">🔐 Login</Link></li>
//                     <li><Link to="/reg">📝 Register</Link></li>
//                     <li><button className="logout-btn" onClick={handleLogout}>🚪 Logout</button></li>
//                 </ul>
//             </div>

//             {/* Sidebar Toggle Button */}
//             <button className="toggle-btn" onClick={handleSidebarToggle}>☰</button>

//             {/* Main Content */}
//             <div className="main-content">
//                 <div className="top-bar">
//                     <h2>Welcome to the Home Page</h2>
//                     <button className="theme-toggle-btn" onClick={handleThemeToggle}>
//                         {darkTheme ? "☀ Light Mode" : "🌙 Dark Mode"}
//                     </button>
//                 </div>

//                 <p className="project-description">
//                     👋 This is a simple full-stack project built using <strong>React</strong>, <strong>Spring Boot</strong>, and <strong>MySQL</strong>. It includes:
//                     <br />
//                     🔐 Secure user <strong>Login</strong> and <strong>Registration</strong> <br />
//                     📊 A page to <strong>view all data</strong> stored in MySQL <br />
//                     💡 Toggle between Light and Dark Mode <br />
//                     🧭 Easy navigation with a collapsible sidebar <br />
//                     🚀 Fully connected frontend and backend
//                 </p>

//                 <div className="buttons">
//                     <Link to="/" className="btn">Login</Link>
//                     <Link to="/reg" className="btn">Register</Link>
//                 </div>
//             </div>

//             {/* Footer */}
//             <footer className="footer">
//                 <p>© 2025 College Connect Projects. All Rights Reserved.</p>
//             </footer>
//         </div>
//     );
// }

// export default Home;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../layout/Navbar";
// import ThemeToggle from "../layout/ThemeToggle";
// import Footer from "../layout/Footer";
// // import "../../css/Theme.css";
// // import "./css/Theme.css";
// import "../css/Theme.css";

// function Home() {
//     const navigate = useNavigate();

//     return (
//         <>
//             <Navbar />
//             <ThemeToggle />
//             <div className="main-content container py-5">
//                 <div className="text-center">
//                     <h2>Welcome to <strong>Campus Connecter</strong> 🎓</h2>
//                     <p className="mt-3">
//                         A full-stack college management app built with <strong>React</strong> + <strong>Spring Boot</strong>.
//                     </p>
//                     <ul className="text-start d-inline-block mt-4">
//                         <li>🔐 Secure login + role-based dashboard</li>
//                         <li>📚 Course assignments + enrollments</li>
//                         <li>📢 Notifications system for all users</li>
//                         <li>🌗 Theme toggle + modern UI</li>
//                     </ul>
//                     <div className="d-flex justify-content-center gap-3 mt-4">
//                         <button className="btn btn-success px-4" onClick={() => navigate("/")}>Login</button>
//                         <button className="btn btn-outline-primary px-4" onClick={() => navigate("/reg")}>Register</button>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default Home;
