import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherCourses() {
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/courses/my-course", { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    setCourse(res.data);

                    // Fetch students for this course
                    axios.get(`http://localhost:8080/api/courses/enrolled-students?courseId=${res.data.id}`, { withCredentials: true })
                        .then((sres) => setStudents(sres.data))
                        .catch((err) => {
                            console.error("Error loading students:", err);
                            setStudents([]);
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching course:", err);
                setCourse(null);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2>📘 My Assigned Course</h2>

            {!course ? (
                <p className="text-muted">You have not been assigned to any course yet.</p>
            ) : (
                <>
                    <div className="card mb-4 p-3">
                        <h4>{course.name}</h4>
                        <p><strong>Branch:</strong> {course.branch}</p>
                        <p><strong>Course ID:</strong> {course.id}</p>
                    </div>

                    <h5>👨‍🎓 Enrolled Students ({students.length})</h5>
                    {students.length === 0 ? (
                        <p className="text-muted">No students enrolled yet.</p>
                    ) : (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, index) => (
                                    <tr key={s.id}>
                                        <td>{index + 1}</td>
                                        <td>{s.name}</td>
                                        <td>{s.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
            <button className="btn btn-secondary mt-4" onClick={() => navigate("/teacher")}>
                ⬅️ Back to Dashboard
            </button>
        </div>
    );
}

export default TeacherCourses;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/layout/Navbar";
// import Sidebar from "../../components/layout/Sidebar";
// import ThemeToggle from "../../components/layout/ThemeToggle";
// import Footer from "../../components/layout/Footer";
// // import "../../css/Theme.css";
// import "../css/Theme.css";


// function TeacherCourses() {
//     const [course, setCourse] = useState(null);
//     const [students, setStudents] = useState([]);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedName = localStorage.getItem("username");
//         const storedEmail = localStorage.getItem("email");
//         const storedRole = localStorage.getItem("role");

//         if (!storedName || !storedEmail || storedRole !== "teacher") {
//             alert("Unauthorized access");
//             navigate("/");
//         } else {
//             setName(storedName);
//             setEmail(storedEmail);
//             setRole(storedRole);
//             fetchCourseAndStudents();
//         }
//     }, [navigate]);

//     const fetchCourseAndStudents = () => {
//         fetch("http://localhost:8080/api/courses/my-course", {
//             credentials: "include",
//         })
//             .then((res) => res.json())
//             .then((courseData) => {
//                 setCourse(courseData);

//                 if (courseData?.id) {
//                     fetch(`http://localhost:8080/api/courses/enrolled-students?courseId=${courseData.id}`, {
//                         credentials: "include",
//                     })
//                         .then((res) => res.json())
//                         .then(setStudents)
//                         .catch((err) => {
//                             console.error("Error loading students:", err);
//                             setStudents([]);
//                         });
//                 }
//             })
//             .catch((err) => {
//                 console.error("Error fetching course:", err);
//                 setCourse(null);
//             });
//     };

//     const sidebarItems = [
//         {
//             label: "Send Notification",
//             icon: "📣",
//             onClick: () => navigate("/teacher/send-notification"),
//         },
//         {
//             label: "View Notifications",
//             icon: "🔔",
//             onClick: () => navigate("/teacher/recieve-notification"),
//         },
//         {
//             label: "Back to Dashboard",
//             icon: "⬅️",
//             onClick: () => navigate("/teacher"),
//         },
//     ];

//     return (
//         <>
//             <Navbar />
//             <ThemeToggle />
//             <div className="d-flex">
//                 <Sidebar
//                     name={name}
//                     email={email}
//                     role={role}
//                     items={sidebarItems}
//                     onLogout={() => {
//                         localStorage.clear();
//                         navigate("/");
//                     }}
//                 />

//                 <div className="main-content container py-4">
//                     <h3>📘 My Assigned Course</h3>

//                     {!course ? (
//                         <p className="text-muted">You have not been assigned to any course yet.</p>
//                     ) : (
//                         <>
//                             <div className="card p-3 mb-4">
//                                 <h5>{course.name}</h5>
//                                 <p><strong>Branch:</strong> {course.branch}</p>
//                                 <p><strong>Course ID:</strong> {course.id}</p>
//                             </div>

//                             <h5>👨‍🎓 Enrolled Students ({students.length})</h5>
//                             {students.length === 0 ? (
//                                 <p className="text-muted">No students enrolled yet.</p>
//                             ) : (
//                                 <table className="table table-striped table-dark table-bordered">
//                                     <thead>
//                                         <tr>
//                                             <th>#</th>
//                                             <th>Name</th>
//                                             <th>Email</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {students.map((s, index) => (
//                                             <tr key={s.id}>
//                                                 <td>{index + 1}</td>
//                                                 <td>{s.name}</td>
//                                                 <td>{s.email}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default TeacherCourses;
