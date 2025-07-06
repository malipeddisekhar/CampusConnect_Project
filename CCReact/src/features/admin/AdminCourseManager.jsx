import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCourseManager() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");

    useEffect(() => {
        fetchCourses();
        fetchTeachers();
        fetchStudents();
    }, []);
    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/courses/summary", { withCredentials: true });
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching course summaries:", err);
        }
    };
    const fetchTeachers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user/teachers", { withCredentials: true });
            setTeachers(res.data);
        } catch (err) {
            console.error("Error fetching teachers:", err);
        }
    };
    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user/students", { withCredentials: true });
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };
    const createCourse = async () => {
        if (!name || !branch) {
            alert("Please enter course name and branch");
            return;
        }
        try {
            await axios.post("http://localhost:8080/api/courses/create", { name, branch }, { withCredentials: true });
            setName("");
            setBranch("");
            fetchCourses();
            alert("✅ Course created!");
        } catch (err) {
            console.error("Error creating course:", err);
            alert("Failed to create course");
        }
    };
    const assignTeacher = async (courseId) => {
        if (!selectedTeacherId) {
            alert("Select a teacher to assign");
            return;
        }
        try {
            await axios.put(
                `http://localhost:8080/api/courses/assign-teacher?courseId=${courseId}&teacherId=${selectedTeacherId}`,
                {},
                { withCredentials: true }
            );
            setSelectedTeacherId("");
            fetchCourses();
        } catch (err) {
            console.error("Error assigning teacher:", err);
            alert("Failed to assign teacher");
        }
    };
    const enrollStudent = async (courseId) => {
        if (!selectedStudentId) {
            alert("Select a student to enroll");
            return;
        }
        try {
            await axios.put(
                `http://localhost:8080/api/courses/enroll-student?courseId=${courseId}&studentId=${selectedStudentId}`,
                {},
                { withCredentials: true }
            );
            setSelectedStudentId("");
            fetchCourses();
        } catch (err) {
            console.error("Error enrolling student:", err);
            alert("Failed to enroll student");
        }
    };
    const deleteCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/courses/delete/${courseId}`, { withCredentials: true });
            fetchCourses();
            alert("Course deleted successfully");
        } catch (err) {
            console.error("Error deleting course:", err);
            alert("Failed to delete course");
        }
    };
    return (
        <div className="container mt-4">
            <h3>📚 Manage Courses</h3>
            {/* Create Course */}
            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Course Name"
                    className="form-control mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    className="form-select mb-2"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="CSM">CSM</option>
                    <option value="CSD">CSD</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="MECH">MECH</option>
                    <option value="EEE">EEE</option>
                </select>
                <button className="btn btn-success" onClick={createCourse}>
                    ➕ Create Course
                </button>
                <button className="btn btn-secondary mt-4" onClick={() => navigate("/admin")}>⬅️ Back to Dashboard</button>
            </div>
            {/* Course Table */}
            <div className="mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Teacher</th>
                            <th>Assign Teacher</th>
                            <th>Enroll Student</th>
                            <th>Enrolled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>{course.name}</td>
                                <td>{course.branch}</td>
                                <td>{course.teacherName || "Not Yet Appointed"}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={selectedCourseId === course.id ? selectedTeacherId : ""}
                                        onChange={(e) => {
                                            setSelectedCourseId(course.id);
                                            setSelectedTeacherId(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Teacher</option>
                                        {teachers.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name} ({t.email})
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-sm btn-primary mt-1" onClick={() => assignTeacher(course.id)}>👤 Assign</button>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={selectedCourseId === course.id ? selectedStudentId : ""}
                                        onChange={(e) => {
                                            setSelectedCourseId(course.id);
                                            setSelectedStudentId(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Student</option>
                                        {students.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name} ({s.email})
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-sm btn-success mt-1" onClick={() => enrollStudent(course.id)}>🎓 Enroll</button>
                                </td>
                                <td>{course.studentCount}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteCourse(course.id)}>❌ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminCourseManager;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
// import ThemeToggle from "../layout/ThemeToggle";
// import Footer from "../layout/Footer";
// import "../css/Theme.css";
// import "../css/DashboardLayout.css"; // 💡 new dashboard styles

// function AdminHome() {
//     const navigate = useNavigate();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     useEffect(() => {
//         const storedName = localStorage.getItem("username");
//         const storedEmail = localStorage.getItem("email");
//         const storedRole = localStorage.getItem("role");

//         if (!storedName || !storedEmail) {
//             alert("User not logged in");
//             navigate("/");
//         } else {
//             setName(storedName);
//             setEmail(storedEmail);
//             setRole(storedRole);
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.clear();
//         alert("You have been logged out.");
//         navigate("/");
//     };

//     return (
//         <>
//             <Navbar />
//             <ThemeToggle />

//             <div className="d-flex dashboard-container">
//                 {/* Sidebar toggler button */}
//                 <button
//                     className="sidebar-toggle-btn"
//                     onClick={() => setSidebarOpen(!sidebarOpen)}
//                 >
//                     {sidebarOpen ? "☰" : "☰"}
//                 </button>

//                 {/* Sidebar (Info + Logout only) */}
//                 {sidebarOpen && (
//                     <Sidebar
//                         name={name}
//                         email={email}
//                         role={role}
//                         items={[]} // No action buttons here
//                         onLogout={handleLogout}
//                     />
//                 )}

//                 {/* Main content with cards */}
//                 <div className="main-content container py-4">
//                     <div className="dashboard-header">
//                         <h2>👋 Welcome, {name}</h2>
//                         <p>You have administrative access to manage courses and users.</p>
//                     </div>

//                     <div className="row g-4 mt-3">
//                         {/* Manage Courses */}
//                         <div
//                             className="col-md-6"
//                             onClick={() => navigate("/admin/manage-courses")}
//                         >
//                             <div className="card dashboard-card animate-slide-in">
//                                 <h4>📘 Manage Courses</h4>
//                                 <p>Create, assign teachers, and enroll students into courses.</p>
//                             </div>
//                         </div>

//                         {/* Send Notification */}
//                         <div
//                             className="col-md-6"
//                             onClick={() => navigate("/admin/send-notification")}
//                         >
//                             <div className="card dashboard-card animate-slide-in delay-1">
//                                 <h4>📢 Send Notifications</h4>
//                                 <p>Notify teachers, students, or everyone at once.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </>
//     );
// }

// export default AdminHome;
