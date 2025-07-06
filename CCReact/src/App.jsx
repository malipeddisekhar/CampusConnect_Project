// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import AdminHome from "./components/AdminHome";
// import TeacherHome from "./components/TeacherHome";
// import StudentHome from "./components/StudentHome";
// import NotificationForm from "./components/NotificationForm";
// import TeacherNotifications from "./components/TeacherNotifications";
// import StudentNotifications from "./components/StudentNotifications";
// import TeacherNotificationForm from "./components/TeacherNotificationForm";
// import AdminCourseManager from "./components/AdminCourseManager";
// import TeacherCourses from "./components/TeacherCourses";
// import Home from "./components/Home";
// // import StudentProfile from "./components/StudentProfile";

// import "bootstrap/dist/css/bootstrap.min.css";
// import AuthPage from "./components/pages/AuthPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthPage />} />

//         {/* <Route path="/" element={<Login />} /> */}
//         <Route path="/reg" element={<Register />} />
//         <Route path="/admin" element={<AdminHome />} />
//         <Route path="/teacher" element={<TeacherHome />} />
//         <Route path="/student" element={<StudentHome />} />
//         <Route path="/admin/send-notification" element={<NotificationForm />} />
//         <Route path="/teacher/recieve-notification" element={<TeacherNotifications />} />
//         <Route path="/student/recieve-notification" element={<StudentNotifications />} />
//         <Route path="/teacher/send-notification" element={<TeacherNotificationForm />} />
//         <Route path="/admin/manage-courses" element={<AdminCourseManager />} />
//         <Route path="/teacher/courses" element={<TeacherCourses />}/>
//         {/* <Route path="/student/profile" element={<StudentProfile />} /> */}
//         <Route path="/home" element={<Home />}/>


//       </Routes>
//     </Router>
//   );
// }
// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication
// import Login from "./features/common/Login";
// import Register from "./features/common/Register";
// import AuthPage from "./components/pages/AuthPage";

// Pages (previously in ./components/, now in ./components/pages/)
// import AdminHome from "./components/pages/AdminHome";
// import TeacherHome from "./features/teacher/TeacherHome";
// import StudentHome from "./features/student/StudentHome";
// import NotificationForm from "./components/pages/NotificationForm";
// import TeacherNotifications from "./features/teacher/TeacherNotifications";
// import StudentNotifications from "./features/student/StudentNotifications";
// import TeacherNotificationForm from "./features/teacher/TeacherNotificationForm";
// import AdminCourseManager from "./components/pages/AdminCourseManager";
// import TeacherCourses from "./features/teacher/TeacherCourses";
// import Home from "./features/common/Home";
// // import StudentProfile from "./components/pages/StudentProfile"; // Uncomment if implemented
import AdminHome from "./features/admin/AdminHome";
import TeacherHome from "./features/teacher/TeacherHome";
import StudentHome from "./features/student/StudentHome";
import NotificationForm from "./features/admin/NotificationForm";
import TeacherNotificationForm from "./features/teacher/TeacherNotificationForm";
import AdminCourseManager from "./features/admin/AdminCourseManager";
import TeacherCourses from "./features/teacher/TeacherCourses";
import TeacherNotifications from "./features/teacher/TeacherNotifications";
import StudentNotifications from "./features/student/StudentNotifications";
// import Home from "./features/common/Home";
import Login from "./features/common/Login";
import Register from "./features/common/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentProfile from "./features/student/StudentProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {/* <Route path="/" element={<AuthPage />} /> */}
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/student" element={<StudentHome />} />

        {/* Notifications */}
        <Route path="/admin/send-notification" element={<NotificationForm />} />
        <Route path="/teacher/send-notification" element={<TeacherNotificationForm/>} />
        <Route path="/teacher/recieve-notification" element={<TeacherNotifications />} />
        <Route path="/student/recieve-notification" element={<StudentNotifications />} />

        {/* Courses */}
        <Route path="/admin/manage-courses" element={<AdminCourseManager />} />
        <Route path="/teacher/courses" element={<TeacherCourses />} />

        {/* DataOfStudents */}
        <Route path="/student/profile" element={<StudentProfile />} />
        {/* Misc */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/student/profile" element={<StudentProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
