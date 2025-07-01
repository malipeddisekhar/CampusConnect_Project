// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>u
//     </>
//   )
// }

// export default App



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminHome from "./components/AdminHome";
import TeacherHome from "./components/TeacherHome";
import StudentHome from "./components/StudentHome";
import NotificationForm from "./components/NotificationForm";
import TeacherNotifications from "./components/TeacherNotifications";
import StudentNotifications from "./components/StudentNotifications";
import TeacherNotificationForm from "./components/TeacherNotificationForm";
import AdminCourseManager from "./components/AdminCourseManager";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/admin/send-notification" element={<NotificationForm />} />
        <Route path="/teacher/recieve-notification" element={<TeacherNotifications />} />
        <Route path="/student/recieve-notification" element={<StudentNotifications />} />
        <Route path="/teacher/send-notification" element={<TeacherNotificationForm />} />
        <Route path="/admin/manage-courses" element={<AdminCourseManager />} />


      </Routes>
    </Router>
  );
}

export default App;
